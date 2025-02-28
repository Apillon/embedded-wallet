import { useEffect, useRef } from 'react';
import { WebStorageKeys } from '../../lib/constants';
import { useAuthContext } from '../../contexts/auth.context';
import { useWalletContext } from '../../contexts/wallet.context';

const eventCaptchaVerified = new Event('EventCaptchaVerified');
const eventCaptchaReload = new Event('EventCaptchaReload');

export default function AuthCaptchaInput({
  className,
  onInitialized,
  onVerified,
}: {
  className?: string;
  onInitialized?: () => void;
  onVerified?: (token: string) => void;
}) {
  const { wallet } = useWalletContext();
  const { setStateValue: setForAuth } = useAuthContext();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Check if captcha token has already been set in current session
      if (window) {
        const procaptchaToken = sessionStorage.getItem(WebStorageKeys.PROCAPTCHA);

        if (procaptchaToken) {
          setToken(procaptchaToken);
          return;
        }
      }

      // Otherwise initialize new captcha form
      initialize();
    }
  }, []);

  /**
   * Set procaptcha token to make it available in many contexts:
   * - auth context in this (ui) app
   * - sessionStorage in gateway app
   * - this (ui) app sessionStorage - to make it available faster
   * - emit as component event
   */
  function setToken(token: string) {
    setForAuth('captcha', token);
    wallet?.xdomain?.storageSet(WebStorageKeys.PROCAPTCHA, token, true);
    sessionStorage.setItem(WebStorageKeys.PROCAPTCHA, token);
    onVerified?.(token);
  }

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

      onInitialized?.();
    } else {
      // Retry
      setTimeout(() => onCaptchaScriptLoaded(), 1000);
    }
  }

  /**
   * Captcha events
   */
  function onCaptchaVerified(captchaOutput: any) {
    document.dispatchEvent(eventCaptchaVerified);
    setToken(captchaOutput);
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

  return (
    <>
      <style>{`#procaptcha-container > * { margin: 0 auto; }`}</style>
      <div id="procaptcha-container" className={className}></div>
    </>
  );
}
