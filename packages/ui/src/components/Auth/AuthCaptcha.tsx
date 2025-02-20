import { useEffect, useRef } from 'react';
import { WebStorageKeys } from '../../lib/constants';

const eventCaptchaVerified = new Event('EventCaptchaVerified');
const eventCaptchaReload = new Event('EventCaptchaReload');

export default function AuthCaptcha({ onVerified }: { onVerified: (token: string) => void }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Check if captcha token has already been set in current session
      if (window) {
        const procaptchaToken = sessionStorage.getItem(WebStorageKeys.PROCAPTCHA);

        if (procaptchaToken) {
          onVerified(procaptchaToken);
          return;
        }
      }

      // Otherwise initialize new captcha form
      initialize();
    }
  }, []);

  /**
   * Script initialization
   */
  function initialize() {
    const script = document.createElement('script');

    script.src = 'https://js.prosopo.io/js/procaptcha.bundle.js';
    script.type = 'module';
    script.id = 'procaptcha-script';
    script.async = true;
    script.defer = true;

    script.onload = () => onCaptchaScriptLoaded();

    document.head.appendChild(script);
  }

  /**
   * Setup the captcha element
   */
  function onCaptchaScriptLoaded() {
    const el = document.getElementById('procaptcha-container');

    if (el && (window as any)?.procaptcha) {
      (window as any)?.procaptcha.render(el, {
        siteKey: import.meta.env.VITE_PROCAPTCHA_KEY ?? 'N/A',
        theme: 'dark',
        callback: onCaptchaVerified,
        openCallback: onCaptchaOpen,
        errorCallback: onCaptchaError,
        expiredCallback: onCaptchaExpired,
      });
    } else {
      // Retry
      setTimeout(() => onCaptchaScriptLoaded(), 1000);
    }
  }

  /**
   * Captcha events
   */
  function onCaptchaVerified(captchaOutput: any) {
    sessionStorage.setItem(WebStorageKeys.PROCAPTCHA, captchaOutput);
    document.dispatchEvent(eventCaptchaVerified);
    onVerified(captchaOutput);
  }

  function onCaptchaOpen() {
    sessionStorage.removeItem(WebStorageKeys.PROCAPTCHA);
  }

  function onCaptchaError() {
    sessionStorage.removeItem(WebStorageKeys.PROCAPTCHA);
    document.dispatchEvent(eventCaptchaReload);
  }

  function onCaptchaExpired() {
    sessionStorage.removeItem(WebStorageKeys.PROCAPTCHA);
    document.dispatchEvent(eventCaptchaReload);
  }

  return <div id="procaptcha-container"></div>;
}
