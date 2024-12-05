import { ethers } from 'ethers';
import { AuthData, AuthStrategy, WebauthnContract } from '../types';
import {
  abort,
  getHashedUsername,
  getPasskeyOrigin,
  getPasskeyXd,
  getPasskeyXdIframe,
} from '../utils';
import { credentialCreate, credentialGet } from '../browser-webauthn';
import { WalletType } from '../constants';

class PasskeyStrategy implements AuthStrategy {
  async getRegisterData(authData: AuthData, isPopup = false) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    if (!authData.hashedUsername) {
      authData.hashedUsername = await getHashedUsername(authData.username);
    }

    if (!authData.hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const wallet = {
      walletType: WalletType.EVM,
      keypairSecret: ethers.ZeroHash,
      title: authData.username,
    };

    if (isPopup) {
      const cred = await getPasskeyXd()?.create(authData.hashedUsername, authData.username);

      if (!cred) {
        abort('XDOMAIN_NOT_INIT');
        return;
      }

      return {
        hashedUsername: authData.hashedUsername,
        credentialId: cred.credentialId,
        pubkey: cred.pubkey,
        optionalPassword: ethers.ZeroHash,
        wallet,
      };
    } else {
      const cred = await credentialCreate(
        {
          name: 'Embedded Wallet Account',
          id: getPasskeyOrigin(),
        },
        {
          id: authData.hashedUsername,
          name: authData.username,
          displayName: authData.username,
        },
        crypto.getRandomValues(new Uint8Array(32))
      );

      return {
        hashedUsername: authData.hashedUsername,
        credentialId: cred.id,
        pubkey: cred.ad.attestedCredentialData!.credentialPublicKey!,
        optionalPassword: ethers.ZeroHash,
        wallet,
      };
    }
  }

  async getProxyResponse(
    WAC: WebauthnContract,
    data: string,
    authData: AuthData,
    mode: 'default' | 'iframe' | 'popup' = 'default'
  ) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const personalization = await WAC.personalization();
    const credentialIds = await WAC.credentialIdsByUsername(hashedUsername as any);

    /**
     * Request passkey from user
     */
    if (mode === 'popup') {
      /**
       * Popup
       */
      const res = await getPasskeyXd()?.get(
        credentialIds.map((c: any) => ethers.toBeArray(c)),
        ethers.toBeArray(ethers.sha256(personalization + ethers.sha256(data).slice(2)))
      );

      if (!res) {
        abort('XDOMAIN_NOT_INIT');
        return;
      }

      // @ts-expect-error Types from abi are not correct
      return await WAC.proxyView(res.credentials.credentialIdHashed, res.credentials.resp, data);
    } else if (mode === 'iframe') {
      /**
       * Iframe
       */
      const res = await getPasskeyXdIframe()?.get(
        credentialIds.map((c: any) => ethers.toBeArray(c)),
        ethers.toBeArray(ethers.sha256(personalization + ethers.sha256(data).slice(2)))
      );

      if (!res) {
        abort('XDOMAIN_NOT_INIT');
        return;
      }

      // @ts-expect-error Types from abi are not correct
      return await WAC.proxyView(res.credentials.credentialIdHashed, res.credentials.resp, data);
    } else {
      /**
       * Direct SDK (login on gateway)
       */
      const credentials = await credentialGet(
        // binary credential ids
        credentialIds.map((c: any) => ethers.toBeArray(c)),
        // challenge
        ethers.toBeArray(ethers.sha256(personalization + ethers.sha256(data).slice(2))),
        getPasskeyOrigin()
      );

      // @ts-expect-error Types from abi are not correct
      return await WAC.proxyView(credentials.credentialIdHashed, credentials.resp, data);
    }
  }
}

export default PasskeyStrategy;
