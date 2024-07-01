import { AuthData, AuthStrategy, WebauthnContract } from '../types';
import { ethers } from 'ethers';

declare class PasswordStrategy implements AuthStrategy {
    abiCoder: ethers.AbiCoder;
    getRegisterData(authData: AuthData): Promise<{
        hashedUsername: Buffer;
        credentialId: string;
        pubkey: {
            kty: number;
            alg: number;
            crv: number;
            x: bigint;
            y: bigint;
        };
        optionalPassword: string;
    } | undefined>;
    getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData): Promise<string>;
    generateNewKeypair(): {
        credentialId: string;
        privateKey: Uint8Array;
        decoded_x: bigint;
        decoded_y: bigint;
    };
}
export default PasswordStrategy;
