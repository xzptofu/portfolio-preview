import type { Metadata } from "next";
import { sitePath } from "./site-path";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xzptofu.github.io"),
  title: "Zhipan Xu — Personal Homepage",
  description: "Zhipan Xu is an EECS MEng student at UC Berkeley working on quantitative research, production machine learning, and adaptive learning systems.",
  icons: { icon: sitePath("/favicon.svg") },
  openGraph: {
    title: "Zhipan Xu — Personal Homepage",
    description: "Quantitative research, online learning, and production machine learning.",
    url: "https://xzptofu.github.io/",
    siteName: "Zhipan Xu",
    type: "website",
    images: [{ url: sitePath("/og-quant.png"), width: 1200, height: 630, alt: "Zhipan Xu — Quantitative research and machine learning" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhipan Xu — Personal Homepage",
    description: "Quantitative research, online learning, and production machine learning.",
    images: [sitePath("/og-quant.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href={sitePath("/fonts/geist-latin-variable.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={sitePath("/fonts/newsreader-latin-variable.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="theme-color" content="#f6f5f0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
