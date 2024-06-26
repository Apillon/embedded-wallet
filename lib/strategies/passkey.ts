import { ethers } from 'ethers';
import { credentialCreate, credentialGet } from '../browser-webauthn';
import { AuthData, AuthStrategy, WebauthnContract } from '../types';
import { abort, getHashedUsername } from '../utils';

class PasskeyStrategy implements AuthStrategy {
  async getRegisterData(authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
    }

    const hashedUsername = await getHashedUsername(authData.username);

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const cred = await credentialCreate(
      {
        name: 'Oasis Wallet Account',
        id: window.location.hostname,
      },
      {
        id: hashedUsername!,
        name: authData.username,
        displayName: authData.username,
      },
      crypto.getRandomValues(new Uint8Array(32))
    );

    return {
      hashedUsername,
      credentialId: cred.id,
      pubkey: cred.ad.attestedCredentialData!.credentialPublicKey!,
      optionalPassword: ethers.ZeroHash,
    };
  }

  async getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
    }

    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
    }

    const personalization = await WAC.personalization();
    const credentialIds = await WAC.credentialIdsByUsername(hashedUsername as any);

    /**
     * Request passKey from user
     */
    const credentials = await credentialGet(
      // binary credential ids
      credentialIds.map((c: any) => ethers.toBeArray(c)),
      // challenge
      ethers.toBeArray(ethers.sha256(personalization + ethers.sha256(data).slice(2)))
    );

    // @ts-expect-error Types from abi are not correct
    return await WAC.proxyView(credentials.credentialIdHashed, credentials.resp, data);
  }
}

export default PasskeyStrategy;
