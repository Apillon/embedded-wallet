import { AuthData, AuthStrategy, WebauthnContract } from '../types';

declare class PasskeyStrategy implements AuthStrategy {
    getRegisterData(authData: AuthData): Promise<{
        hashedUsername: Buffer;
        credentialId: Uint8Array;
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
}
export default PasskeyStrategy;
