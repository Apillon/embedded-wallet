# Passkey authentication AND global storage gateway

A react app that is deployed by Apillon to act as a relying party ID (domain) for passkey generation and validation.
This allows wallets to be created and used with passkeys across multiple domains.

## Use case 1 - Registration

- Redirect from **developer app** to gateway
- Display confirmation code form
- Register: confirmation code check, triggers credentials.create, redirects back to **developer app**

## Use case 2 - Wallet action authentication (login, sign)

- Used as `<iframe>` on **developer app**
- No UI is shown
- Trigger `credentials.get` on wallet's auth request (`getProxyForStrategy`). Window communication is done with `get_pk_credentials`/`apillon_pk_response` events.

## Use case 3 - Global storage

- Local Storage on passkey domain, accessed through iframe
- Window communication with `storage_set`, `storage_get` and `apillon_pk_response` events
- Using local storage API means that data is stored on users' device per browser. Data is not shared between different browsers or devices.
