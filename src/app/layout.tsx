import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/hooks/theme-provide";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import { COMPANY_NAME } from "@/lib/constants";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

const poppins = localFont({
  src: [
    { path: "/fonts/Poppins-ExtraLight.ttf", weight: "100", style: "normal" },
    { path: "/fonts/Poppins-Light.ttf", weight: "200", style: "normal" },
    { path: "/fonts/Poppins-Regular.ttf", weight: "300", style: "normal" },
    { path: "/fonts/Poppins-Medium.ttf", weight: "400", style: "normal" },
    { path: "/fonts/Poppins-SemiBold.ttf", weight: "500", style: "normal" },
    { path: "/fonts/Poppins-Bold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/Poppins-ExtraBold.ttf", weight: "700", style: "normal" },
    { path: "/fonts/Poppins-Black.ttf", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description: `Your number one market in africa`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${poppins.className} antialiased
 text-foreground bg-accent/30 font-light`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
