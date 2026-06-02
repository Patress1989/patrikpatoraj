import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Patrik Patoraj" },
      { name: "description", content: "Moderné webstránky na mieru. Rýchly vývoj už za 3–7 dní. Rýchle, výkonné a cenovo dostupné weby pre moderné podnikanie." },
      { name: "author", content: "Patrik Patoraj" },
      { property: "og:title", content: "Patrik Patoraj" },
      { property: "og:description", content: "Moderné webstránky na mieru. Rýchly vývoj už za 3–7 dní. Rýchle, výkonné a cenovo dostupné weby pre moderné podnikanie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Patrik Patoraj" },
      { name: "twitter:description", content: "Moderné webstránky na mieru. Rýchly vývoj už za 3–7 dní. Rýchle, výkonné a cenovo dostupné weby pre moderné podnikanie." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1UsyXvl6qoMxZwH2urgkv3DeEbs1/social-images/social-1776701490248-náhľadový_obrázok_patrikpatoraj.sk.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1UsyXvl6qoMxZwH2urgkv3DeEbs1/social-images/social-1776701490248-náhľadový_obrázok_patrikpatoraj.sk.webp" },
      { name: "google-site-verification", content: "n5gYbrW8T6kwmqHr3Odh-wjtJMDGvf1wESANNk57A5M" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/webp", href: "/logo-patrikpatoraj.webp" },
      { rel: "apple-touch-icon", href: "/logo-patrikpatoraj.webp" },
    ],
    scripts: [
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '771300210159010');fbq('track', 'PageView');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <head>
        <HeadContent />
        <script async src="https://app.risali.app/risali.js?site=patrikpatoraj"></script>
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=771300210159010&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
