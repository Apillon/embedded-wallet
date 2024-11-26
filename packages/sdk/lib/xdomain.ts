import { abort } from './utils';

/**
 * Use a popup for passkey to get a consistent RPID.
 * This makes wallets with passkeys available across different domains.
 */
export class XdomainPasskey {
  src = import.meta.env.VITE_PASSKEY_IFRAME_ORIGIN ?? 'https://passkey.apillon.io';
  popup: WindowProxy | null = null;
  loadPromise: { resolve: () => void; reject: (e: any) => void } | undefined;
  lastEventId = 0; // use this to match iframe response with promise resolvers
  promises: { id: number; resolve: (v: any) => void; reject: (e: any) => void }[] = [];

  constructor() {
    window.addEventListener('message', this.onResponse.bind(this));
  }

  onResponse(ev: MessageEvent) {
    if (ev?.data?.type === 'apillon_pk_response' || ev?.data?.type === 'apillon_pk_error') {
      const promiseIndex = this.promises.findIndex(x => x.id === ev.data.id);

      if (promiseIndex > -1) {
        if (ev.data.type === 'apillon_pk_response') {
          this.promises[promiseIndex].resolve(ev.data.content);
        } else {
          this.promises[promiseIndex].reject(ev.data.content);
        }

        this.promises.splice(promiseIndex, 1);
      }

      if (this.popup) {
        this.popup.close();
        this.popup = null;
      }
    } else if (ev?.data?.type === 'apillon_pk_load' && this.loadPromise) {
      this.loadPromise.resolve();
      this.loadPromise = undefined;
    }
  }

  getEventId() {
    this.lastEventId += 1;
    return this.lastEventId;
  }

  async openPopup() {
    if (this.popup) {
      this.popup.close();
      this.popup = null;
    }

    const width = 400;
    const height = 400;

    this.popup = window.open(
      this.src,
      '_blank',
      [
        `width=${width}`,
        `height=${height}`,
        `left=${Math.round(window.innerWidth / 2 + window.screenX - width / 2)}`,
        `top=${Math.round(window.innerHeight / 2 + window.screenY - height / 2)}`,
        `location=no`,
        `resizable=no`,
      ].join(',')
    );

    // Wait for popup window content to load (resolves on `apillon_pk_load` postMessage event)
    await new Promise<void>((resolve, reject) => {
      this.loadPromise = { resolve, reject };
    });
  }

  async create(hashedUsername: Buffer, username: string) {
    await this.openPopup();

    if (!this.popup) {
      return abort('IFRAME_NOT_INIT');
    }

    const id = this.getEventId();

    this.popup.postMessage(
      {
        type: 'create',
        id,
        content: {
          hashedUsername,
          username,
        },
      },
      this.src
    );

    return new Promise<{
      credentialId: Uint8Array;
      pubkey: any;
    }>((resolve, reject) => {
      this.promises.push({
        id,
        resolve,
        reject,
      });
    });
  }

  async get(credentials: Uint8Array[], challenge: Uint8Array) {
    await this.openPopup();

    if (!this.popup) {
      return abort('IFRAME_NOT_INIT');
    }

    const id = this.getEventId();

    this.popup.postMessage(
      {
        type: 'get',
        id,
        content: {
          credentials,
          challenge,
        },
      },
      this.src
    );

    return new Promise<{
      credentials: {
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
      };
    }>((resolve, reject) => {
      this.promises.push({
        id,
        resolve,
        reject,
      });
    });
  }
}
