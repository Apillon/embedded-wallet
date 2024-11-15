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

  window.top?.postMessage(
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
}

async function getPasskey(
  eventId: number,
  content: { credentials: Uint8Array[]; challenge: Uint8Array }
) {
  const credentials = await credentialGet(
    // binary credential ids
    content.credentials,
    // challenge
    content.challenge
  );

  window.top?.postMessage(
    {
      type: 'apillon_pk_response',
      id: eventId,
      content: {
        credentials,
      },
    },
    '*'
  );
}
