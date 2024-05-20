import { AuthData, AuthStrategy, WebauthnContract } from '../types';
import { secp256r1 } from '@noble/curves/p256';
import { bytesToHex } from '@noble/curves/abstract/utils';
import { ethers } from 'ethers';
import { getHashedUsername } from '../utils';

class PasswordStrategy implements AuthStrategy {
  abiCoder = ethers.AbiCoder.defaultAbiCoder();

  async getRegisterData(authData: AuthData) {
    try {
      if (!authData.username) {
        throw new Error('No username');
      }

      if (!authData.password) {
        throw new Error('No password');
      }

      const hashedUsername = await getHashedUsername(authData.username);

      if (!hashedUsername) {
        throw new Error('Could not hash username');
      }

      const keyPair = this.generateNewKeypair();

      return {
        hashedUsername,
        credentialId: keyPair.credentialId,
        pubkey: {
          kty: 2, // Elliptic Curve format
          alg: -7, // ES256 algorithm
          crv: 1, // P-256 curve
          x: keyPair.decoded_x,
          y: keyPair.decoded_y,
        },
        optionalPassword: ethers.encodeBytes32String(authData.password),
      };
    } catch (e) {
      console.error(e);
    }
  }

  async getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData) {
    try {
      if (!authData.username) {
        throw new Error('No username');
      }

      if (!authData.password) {
        throw new Error('No password');
      }

      const hashedUsername = await getHashedUsername(authData.username);

      if (!hashedUsername) {
        throw new Error('Could not hash username');
      }

      const digest = ethers.solidityPackedKeccak256(
        ['bytes32', 'bytes'],
        [ethers.encodeBytes32String(authData.password), data]
      );

      return await WAC.proxyViewPassword(hashedUsername as any, digest, data);
    } catch (e) {
      console.error(e);
    }
  }

  generateNewKeypair() {
    const privateKey = secp256r1.utils.randomPrivateKey();
    const pubKey = secp256r1.getPublicKey(privateKey, false);
    const pubKeyString = '0x' + bytesToHex(pubKey);
    const credentialId = this.abiCoder.encode(['string'], [pubKeyString]);

    const coordsString = pubKeyString.slice(4, pubKeyString.length); // removes 0x04
    const decoded_x = BigInt('0x' + coordsString.slice(0, 64)); // x is the first half
    const decoded_y = BigInt('0x' + coordsString.slice(64, coordsString.length)); // y is the second half

    return {
      credentialId,
      privateKey,
      decoded_x,
      decoded_y,
    };
  }
}

export default PasswordStrategy;
