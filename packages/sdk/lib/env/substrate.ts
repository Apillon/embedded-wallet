import { SignerPayloadJSON } from '@polkadot/types/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { formatBalance } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { AccountWallet, Network, PlainTransactionParams } from '../types';
import { abort, EmbeddedWallet, SubstrateAccountAbi, WalletType } from '../main';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ethers } from 'ethers6';

class SubstrateEnvironment {
  rpcUrls = {} as { [networkId: string]: string };
  providers = {} as { [networkId: string]: WsProvider };
  apis = {} as { [networkId: string]: ApiPromise };
  explorerUrls = {} as { [networkId: string]: string };
  userWallets = [] as AccountWallet[];
  userContractAddress = '';

  constructor(
    public wallet: EmbeddedWallet,
    public networks: Network[]
  ) {
    if (networks) {
      for (const ntw of networks) {
        if (typeof ntw.id === 'string') {
          this.rpcUrls[ntw.id] = ntw.rpcUrl;
          this.explorerUrls[ntw.id] = ntw.explorerUrl;
        }
      }
    }
  }

  /**
   * Get polkadot.js API instance. Initialize it if needed.
   */
  async getApiForNetworkId(networkId?: string) {
    if (!networkId) {
      /**
       * Use default ID if none provided.
       * If default ID doesnt work, use first network from config
       */
      networkId =
        typeof this.wallet.defaultNetworkId === 'string'
          ? this.wallet.defaultNetworkId
          : Object.keys(this.rpcUrls)[0];
    }

    if (!networkId || !this.rpcUrls[networkId]) {
      return;
    }

    if (!this.providers[networkId]) {
      this.providers[networkId] = new WsProvider(this.rpcUrls[networkId]);
    }

    if (!this.apis[networkId]) {
      this.apis[networkId] = await ApiPromise.create({ provider: this.providers[networkId] });
    }

    if (!this.apis[networkId]) {
      abort('CROSS_CHAIN_PROVIDER_NOT_INITIALIZED');
      return;
    }

    return this.apis[networkId];
  }

  async getAccountBalance(
    address: string,
    networkId = this.wallet.defaultNetworkId,
    _decimals = 18
  ) {
    if (!networkId || typeof networkId !== 'string' || !this.rpcUrls[networkId]) {
      return '0';
    }

    const api = await this.getApiForNetworkId(networkId);

    if (!api) {
      return '';
    }

    const {
      data: { free },
    } = await api.query.system.account(address);

    return free.toString();
  }

  async signTransaction(
    params: PlainTransactionParams<SubmittableExtrinsic<any, any>> & { chainId?: string }
  ) {
    const walletIndex =
      params.walletIndex || params.walletIndex === 0
        ? params.walletIndex
        : this.wallet.user.walletIndex;

    if (walletIndex >= this.userWallets.length) {
      abort('SIGN_TX_INVALID_WALLET_INDEX');
      return;
    }

    const chainId = this.validateChainId(params.chainId);

    await this.wallet.handleNetworkChange(chainId);

    if (!params.strategy) {
      params.strategy = this.wallet.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.wallet.user.username) {
        params.authData = {
          username: this.wallet.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!params.authData.walletType) {
      params.authData.walletType = WalletType.SUBSTRATE;
    }

    const api = await this.getApiForNetworkId(chainId);

    if (!api) {
      abort('SIGN_TX_NO_POLKADOT_API');
      return;
    }

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      return await new Promise<{
        signedTxData: string;
        chainId?: number | string;
      }>((resolve, reject) => {
        this.wallet.events.emit('txApprove', {
          polkadot: { ...params, mustConfirm: false, resolve, reject },
        });
      });
    }

    const extrinsicVersion = api.runtimeMetadata.asV15.extrinsic.version.toNumber();

    console.log(params.tx.toHuman());

    const [lastHash, genesisHash, property] = await Promise.all([
      api.rpc.chain.getFinalizedHead(),
      api.rpc.chain.getBlockHash(0),
      api.rpc.system.properties(),
    ]);

    const { block } = await api.rpc.chain.getBlock(lastHash);

    const address = encodeAddress(
      decodeAddress(this.userWallets[walletIndex].address),
      +property.ss58Format.unwrapOr(42).toString()
    );

    const accountInfo = await api.query.system.account(address);

    // const { tx } = expandMetadata(api.registry, api.runtimeMetadata);
    // const methodFn = tx[params.tx.method.section][params.tx.method.method];

    const unsigned: SignerPayloadJSON = {
      method: params.tx.method.toHex(),
      address,
      blockHash: block.header.hash.toHex(),
      blockNumber: block.header.number.toHex(),
      era: api.registry
        .createType('ExtrinsicEra', {
          current: block.header.number.toNumber(),
          period: 64,
        })
        .toHex(),
      genesisHash: genesisHash.toHex(),
      nonce: accountInfo.nonce.toHex(),
      specVersion: api.runtimeVersion.specVersion.toHex(),
      transactionVersion: api.runtimeVersion.transactionVersion.toHex(),
      tip: api.registry.createType('Compact<Balance>', 0).toHex(),
      signedExtensions: api.registry.signedExtensions,
      version: extrinsicVersion,
    };

    // let signingPayload = api.registry
    //   .createType('ExtrinsicPayload', params.tx, {
    //     // ...
    //   })
    //   .toU8a();
    // signingPayload = `0x${signingPayload.substring(4, signingPayload.length)}`;

    // if (signingPayload.length > 256) {
    //   signingPayload = api.registry.hash(signingPayload); // blake2b_256
    // }

    const signingPayload = api.registry.createType('ExtrinsicPayload', unsigned, {
      version: extrinsicVersion,
    });

    let message = signingPayload.toU8a({ method: true });
    if (message.length > 256) {
      message = api.registry.hash(message); // blake2b_256
    }

    const AC = new ethers.Interface(SubstrateAccountAbi);
    const data = AC.encodeFunctionData('sign', [walletIndex, message]);

    const res = await this.wallet.getProxyForStrategy(params.strategy, data, params.authData);

    if (res) {
      const [signature] = AC.decodeFunctionResult('sign', res).toArray();

      // const extr = api.registry.createType(
      //   'Extrinsic',
      //   { method: params.tx.method },
      //   { version: params.tx.version }
      // );

      // const signedTxData = extr.addSignature(
      //   decodeAddress(this.userWallets[walletIndex].address),
      //   signature,
      //   signingPayload
      // );

      // const signedTxData = params.tx.addSignature(
      //   this.userWallets[walletIndex].address,
      //   signature,
      //   signingPayload
      // );

      const signedTxData = api.registry
        .createType('Extrinsic', { method: unsigned.method }, { version: extrinsicVersion })
        .addSignature(unsigned.address, signature, unsigned);

      console.log('signed tx', signedTxData.toHuman());

      const txHash = await api.rpc.author.submitExtrinsic(signedTxData);

      console.log('tx hash', txHash);

      return {
        signedTxData,
        chainId,
      };
    }
  }

  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(chainId?: string | number) {
    if (chainId && (typeof chainId === 'number' || !this.rpcUrls[chainId])) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
      return;
    } else if (
      !chainId &&
      ((!!this.wallet.defaultNetworkId && !this.rpcUrls[this.wallet.defaultNetworkId]) ||
        typeof this.wallet.defaultNetworkId === 'number')
    ) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
      return;
    }

    /**
     * If no chain specified use default from app params
     */
    if (!chainId && !!this.wallet.defaultNetworkId) {
      chainId = this.wallet.defaultNetworkId as string;
    }

    return chainId as string;
  }

  formatBalance = formatBalance;
}

export { SubstrateEnvironment };
export default SubstrateEnvironment;
