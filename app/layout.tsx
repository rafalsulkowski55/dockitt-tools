import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dockitt — Free PDF Tools Online",
  description: "Compress, merge, split and convert PDF files — free, fast, and without limits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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

        <header style={{
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 800, fontSize: "18px", color: "#111" }}>
              Dockitt
            </span>
          </Link>
          <nav style={{ display: "flex", gap: "24px" }}>
            <Link href="/" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>
              All Tools
            </Link>
            <Link href="/convert-pdf" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>
              Convert PDF
            </Link>
            <Link href="/categories" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>
              Categories
            </Link>
          </nav>
        </header>

        {children}

        <footer style={{
          borderTop: "1px solid #e5e7eb",
          background: "#ffffff",
          padding: "24px",
          marginTop: "80px",
          textAlign: "center",
          fontSize: "13px",
          color: "#999",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "12px" }}>
            <Link href="/convert-pdf" style={{ color: "#999", textDecoration: "none" }}>Convert PDF</Link>
            <Link href="/categories/core" style={{ color: "#999", textDecoration: "none" }}>Core Tools</Link>
            <Link href="/categories/security" style={{ color: "#999", textDecoration: "none" }}>Security Tools</Link>
            <Link href="/categories/utility" style={{ color: "#999", textDecoration: "none" }}>Utility Tools</Link>
            <Link href="/about" style={{ color: "#999", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#999", textDecoration: "none" }}>Contact</Link>
            <Link href="/privacy" style={{ color: "#999", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#999", textDecoration: "none" }}>Terms of Use</Link>
          </div>
          © {new Date().getFullYear()} Dockitt — Free PDF Tools Online
        </footer>

      </body>
    </html>
  );
}