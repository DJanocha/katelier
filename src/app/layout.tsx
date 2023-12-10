import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { BottomNavigation } from "~/app/_components/bottom-navigation";
import { Providers } from "~/app/providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers headers={headers()}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <div className="flex h-screen max-h-screen min-h-screen w-full flex-col  bg-gradient-to-b via-main-layout-gradient-via from-main-layout-gradient-from to-main-layout-gradient-to ">
            <div className="overflow-auto flex-grow">{children}</div>
            <BottomNavigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
