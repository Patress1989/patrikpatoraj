import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "cookie-consent";
const FB_PIXEL_ID = "771300210159010";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    __cookieConsentOpen?: () => void;
  }
}

function loadFacebookPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;
  // Standard Meta Pixel bootstrap
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      loadFacebookPixel();
    } else if (!stored) {
      setVisible(true);
    }
    window.__cookieConsentOpen = () => {
      localStorage.removeItem(STORAGE_KEY);
      setVisible(true);
    };
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    loadFacebookPixel();
  };

  const deny = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Súhlas s cookies"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto w-full max-w-[600px] rounded-2xl border border-white/10 bg-background/95 p-5 shadow-2xl backdrop-blur-md">
        <h2 className="text-base font-semibold text-foreground">Súhlas s cookies</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Používame cookies na meranie návštevnosti (Facebook Pixel). Vaše rozhodnutie môžete kedykoľvek zmeniť v pätičke.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={deny}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Odmietam
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-primary rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            Súhlasím
          </button>
        </div>
        <Link
          to="/gdpr"
          className="mt-3 inline-block text-xs text-muted-foreground hover:text-foreground"
        >
          Viac v Ochrane údajov →
        </Link>
      </div>
    </div>
  );
}
