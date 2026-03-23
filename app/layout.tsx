import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dockitt — Free PDF Tools Online",
  description: "Compress, merge, split and convert PDF files — free, fast, and without limits.",
  metadataBase: new URL("https://www.dockitt.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dockitt — Free PDF Tools Online",
    description: "Compress, merge, split and convert PDF files — free, fast, and without limits.",
    url: "https://www.dockitt.com",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dockitt — Free PDF Tools Online",
    description: "Compress, merge, split and convert PDF files — free, fast, and without limits.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HKZWGRTN86"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HKZWGRTN86');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} antialiased`} style={{ margin: 0, background: "#f9fafb" }}>

        <Header />

        {children}

        <footer style={{
          borderTop: "1px solid #e5e7eb",
          background: "#ffffff",
          padding: "24px 16px",
          marginTop: "80px",
          textAlign: "center",
          fontSize: "13px",
          color: "#666",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 20px", marginBottom: "12px" }}>
            <Link href="/convert-pdf" style={{ color: "#666", textDecoration: "none" }}>Convert PDF</Link>
            <Link href="/categories/core" style={{ color: "#666", textDecoration: "none" }}>Core Tools</Link>
            <Link href="/categories/security" style={{ color: "#666", textDecoration: "none" }}>Security Tools</Link>
            <Link href="/categories/utility" style={{ color: "#666", textDecoration: "none" }}>Utility Tools</Link>
            <Link href="/guides" style={{ color: "#666", textDecoration: "none" }}>Guides</Link>
            <Link href="/about" style={{ color: "#666", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#666", textDecoration: "none" }}>Contact</Link>
            <Link href="/privacy" style={{ color: "#666", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#666", textDecoration: "none" }}>Terms of Use</Link>
          </div>
          © {new Date().getFullYear()} Dockitt — Free PDF Tools Online
        </footer>

      </body>
    </html>
  );
}
 

 