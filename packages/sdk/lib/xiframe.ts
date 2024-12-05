import { abort, isSafari } from './utils';

/**
 * Iframe for cross domain passkey checks.
 * Only `credentials.get` supported.
 * `credentials.create` is subject to strict limitations when in iframe, so it should be done via popup or a gateway page.
 */
export class XdomainIframe {
  src = import.meta.env.VITE_XDOMAIN_PASSKEY_SRC ?? 'https://passkey.apillon.io';
  iframe: HTMLIFrameElement | undefined;
  promises: { id: number; resolve: (v: any) => void; reject: (e: any) => void }[] = [];
  lastEventId = 0; // use this to match iframe response with promise resolvers

  constructor(public clientId: string) {
    window.addEventListener('message', this.onResponse.bind(this));
    this.initIframe();
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
    }
  }

  async initIframe() {
    if (!window) {
      abort('XDOMAIN_NOT_INIT');
      return;
    }

    const i = document.createElement('iframe');

    const iframeLoading = new Promise<void>(resolve => {
      i.addEventListener('load', () => resolve(), { once: true });
    });

    i.setAttribute('src', `${this.src}?clientId=${this.clientId}`);

    i.setAttribute('allow', `publickey-credentials-get ${this.src}`);
    i.style.pointerEvents = 'none';
    i.style.width = '1px';
    i.style.height = '1px';
    i.style.overflow = 'hidden';
    i.style.opacity = '0';

    this.iframe = i;

    document.body.appendChild(i);

    await iframeLoading;
  }

  getEventId() {
    this.lastEventId += 1;
    return this.lastEventId;
  }

  async get(credentials: Uint8Array[], challenge: Uint8Array) {
    if (!this.iframe) {
      await this.initIframe();

      await new Promise(resolve => setTimeout(resolve, 150));

      if (!this.iframe) {
        return abort('XDOMAIN_NOT_INIT');
      }
    }

    this.iframe.focus();

    if (isSafari()) {
      setTimeout(() => {
        this.iframe?.contentWindow?.focus();
      }, 10);
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const id = this.getEventId();

    this.iframe.contentWindow?.postMessage(
      {
        type: 'get_pk_credentials',
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
