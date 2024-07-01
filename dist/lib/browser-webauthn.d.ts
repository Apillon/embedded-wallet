/**
 * @src https://github.com/oasisprotocol/demo-authzn/blob/main/backend/src/webauthn.ts
 */
type COSEPublicKey_EC = {
    kty: number;
    alg: number;
    crv: number;
    x: bigint;
    y: bigint;
};
interface AttestedCredentialData {
    aaguid: Uint8Array;
    credentialId: Uint8Array;
    credentialPublicKey: COSEPublicKey_EC;
}
interface AuthenticatorData {
    rpIdHash: Uint8Array;
    flags: {
        UP: boolean;
        UV: boolean;
        BE: boolean;
        BS: boolean;
        AT: boolean;
        ED: boolean;
    };
    signCount: number;
    attestedCredentialData?: AttestedCredentialData;
}
export declare function decodeAuthenticatorData(ad: Uint8Array): AuthenticatorData;
export declare function credentialCreate(rp: PublicKeyCredentialRpEntity, user: PublicKeyCredentialUserEntity, challenge: Uint8Array): Promise<{
    id: Uint8Array;
    cd: string;
    ad: AuthenticatorData;
}>;
export declare function credentialGet(credentials: Uint8Array[], challenge?: Uint8Array): Promise<{
    credentialIdHashed: string;
    challenge: Uint8Array;
    resp: {
        authenticatorData: Uint8Array;
        clientDataTokens: {
            t: number;
            k: string;
            v: string;
        }[];
        sigR: bigint;
        sigS: bigint;
    };
}>;
export {};
