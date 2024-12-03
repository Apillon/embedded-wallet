# Passkey authentication gateway

A react app that is deployed by Apillon to act as a relying party ID (domain) for passkey generation and validation.
This allows wallets to be created and used with passkeys across multiple domains.

## Use case 1 - Registration & Login

- Redirect from **developer app** to gateway
- Display login form
- Register: sends Apillon confirmation email, confirmation code check, triggers credentials.create, redirects back to **developer app**
- Login: triggers crendentials.get, redirects back to **developer app**

## Use case 2 - Wallet action authentication

- Used as `<iframe>` on **developer app**
- No UI is shown
- Trigger `credentials.get` on wallet's auth request (`getProxyForStrategy`). Window communication is done with `get_pk_credentials`/`apillon_pk_response` events.
