export function isValidUrl(str: string) {
  let url;

  try {
    url = new URL(str);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const WebStorageKeys = {
  WALLET_CONTEXT: 'oaw_context',
  TRANSACTIONS_CONTEXT: 'oaw_transactions',
  TOKENS_CONTEXT: 'oaw_tokens',
  ERROR_LOG: 'oaw_err',
  OTP_EXPIRATION: 'oaw_otp_expire_time',
  REGISTER_PK: 'oaw_reg_pk',
  WALLET_TYPE: 'oaw_wallet_t',
  SUPPORTED_ENVS: 'oaw_supp_env',
};
