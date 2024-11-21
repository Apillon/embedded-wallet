import { abort } from './utils';

/**
 * Use an iframe for passkey to get a consistent RPID.
 * This makes wallets with passkeys available across different domains.
 */
export class PasskeyIframe {
  src = import.meta.env.VITE_PASSKEY_IFRAME_URL ?? 'DEFAULT APILLON URL';
  origin = import.meta.env.VITE_PASSKEY_IFRAME_ORIGIN ?? 'DEFAULT APILLON URL';
  iframe: HTMLIFrameElement | undefined;
  retryTimeout: ReturnType<typeof setTimeout> | null = null;
  lastEventId = 0; // use this to match iframe response with promise resolvers
  promises: { id: number; resolve: (v: any) => void }[] = [];

  constructor() {
    this.initIframe();
    window.addEventListener('message', this.onResponse.bind(this));
  }

  /**
   * Create iframe
   * Retry until browser window is available.
   */
  async initIframe() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    if (!!this.iframe) {
      return;
    }

    if (!window) {
      this.retryTimeout = setTimeout(() => this.initIframe, 500);
      return;
    }

    const i = document.createElement('iframe');

    const iframeLoading = new Promise<void>(resolve => {
      i.addEventListener('load', () => resolve(), { once: true });
    });

    i.setAttribute('src', this.src);

    i.setAttribute(
      'allow',
      `publickey-credentials-get ${this.origin}; publickey-credentials-create ${this.origin};`
    );

    i.style.width = '1px';
    i.style.height = '1px';
    i.style.display = 'none';

    document.body.appendChild(i);

    this.iframe = i;

    await iframeLoading;
  }

  onResponse(ev: MessageEvent) {
    if (ev?.data?.type === 'apillon_pk_response') {
      const promiseIndex = this.promises.findIndex(x => x.id === ev.data.id);

      if (promiseIndex > -1) {
        this.promises[promiseIndex].resolve(ev.data.content);
        this.promises.splice(promiseIndex, 1);
      }
    }
  }

  getEventId() {
    this.lastEventId += 1;
    return this.lastEventId;
  }

  async create(hashedUsername: Buffer, username: string) {
    if (!this.iframe) {
      return abort('IFRAME_NOT_INIT');
    }

    const id = this.getEventId();

    this.iframe.contentWindow?.postMessage(
      {
        type: 'create',
        id,
        content: {
          hashedUsername,
          username,
        },
      },
      this.origin
    );

    return new Promise<{
      credentialId: Uint8Array;
      pubkey: any;
    }>(resolve => {
      this.promises.push({
        id,
        resolve,
      });
    });
  }

  async get(credentials: Uint8Array[], challenge: Uint8Array) {
    if (!this.iframe) {
      return abort('IFRAME_NOT_INIT');
    }

    const id = this.getEventId();

    this.iframe.contentWindow?.postMessage(
      {
        type: 'get',
        id,
        content: {
          credentials,
          challenge,
        },
      },
      this.origin
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
    }>(resolve => {
      this.promises.push({
        id,
        resolve,
      });
    });
  }
}
