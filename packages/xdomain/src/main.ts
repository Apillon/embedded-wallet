import { credentialCreate, credentialGet } from './browser-webauthn';

window.addEventListener('message', ev => {
  if (ev.data.type === 'create') {
    createPasskey(ev.data.id, ev.data.content);
  } else if (ev.data.type === 'get') {
    getPasskey(ev.data.id, ev.data.content);
  }
});

async function createPasskey(
  eventId: number,
  content: { hashedUsername: Buffer; username: string }
) {
  try {
    const cred = await credentialCreate(
      {
        name: 'Embedded Wallet Account',
        id: window.location.hostname,
      },
      {
        id: content.hashedUsername,
        name: content.username,
        displayName: content.username,
      },
      crypto.getRandomValues(new Uint8Array(32))
    );
    window.opener?.postMessage(
      {
        type: 'apillon_pk_response',
        id: eventId,
        content: {
          credentialId: cred.id,
          pubkey: cred.ad.attestedCredentialData!.credentialPublicKey!,
        },
      },
      '*'
    );
  } catch (e) {
    window.opener?.postMessage(
      {
        type: 'apillon_pk_error',
        id: eventId,
        content: e,
      },
      '*'
    );
  }
}

async function getPasskey(
  eventId: number,
  content: { credentials: Uint8Array[]; challenge: Uint8Array }
) {
  try {
    const credentials = await credentialGet(
      // binary credential ids
      content.credentials,
      // challenge
      content.challenge
    );

    window.opener?.postMessage(
      {
        type: 'apillon_pk_response',
        id: eventId,
        content: {
          credentials,
        },
      },
      '*'
    );
  } catch (e) {
    window.opener?.postMessage(
      {
        type: 'apillon_pk_error',
        id: eventId,
        content: e,
      },
      '*'
    );
  }
}
