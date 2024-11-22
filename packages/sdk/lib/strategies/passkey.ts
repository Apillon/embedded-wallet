import { ethers } from 'ethers';
import { AuthData, AuthStrategy, WebauthnContract } from '../types';
import { abort, getHashedUsername, getPasskeyIframe } from '../utils';

class PasskeyStrategy implements AuthStrategy {
  async getRegisterData(authData: AuthData, hashedUsername?: Buffer) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    if (!hashedUsername) {
      hashedUsername = await getHashedUsername(authData.username);
    }

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const cred = await getPasskeyIframe()?.create(hashedUsername, authData.username);

    if (!cred) {
      abort('IFRAME_NOT_INIT');
      return;
    }

    return {
      hashedUsername,
      credentialId: cred.credentialId,
      pubkey: cred.pubkey,
      optionalPassword: ethers.ZeroHash,
    };
  }

  async getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData) {
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
    const res = await getPasskeyIframe()?.get(
      credentialIds.map((c: any) => ethers.toBeArray(c)),
      ethers.toBeArray(ethers.sha256(personalization + ethers.sha256(data).slice(2)))
    );

    if (!res) {
      abort('IFRAME_NOT_INIT');
      return;
    }

    // @ts-expect-error Types from abi are not correct
    return await WAC.proxyView(res.credentials.credentialIdHashed, res.credentials.resp, data);
  }
}

export default PasskeyStrategy;
