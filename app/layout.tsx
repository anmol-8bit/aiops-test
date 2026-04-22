import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avenir = localFont({
  src: [
    { path: "./fonts/Avenir-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Avenir-Heavy.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neutrino  Docs",
  description:
    "Interactive documentation for Neutrino AI Ops incident workflows, RCA, stakeholder communication, and platform architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={avenir.variable}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storedTheme = window.localStorage.getItem("docs-theme");
                  var theme = storedTheme === "dark" || storedTheme === "light"
                    ? storedTheme
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.theme = theme;
                } catch (error) {
                  document.documentElement.dataset.theme = "light";
                }
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
