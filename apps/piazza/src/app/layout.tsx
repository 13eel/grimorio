import "./_styles/globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { Providers } from "./_components/providers";

export const metadata: Metadata = {
  title: "Grimorio",
  description:
    "Localizzazione italiana non ufficiale di Blood on the Clocktower",
  icons: [{ rel: "icon", url: "/favicon-32x32.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
