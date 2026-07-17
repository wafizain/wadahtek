import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wadahtek | Rekomendasi Teknologi Terkini",
  description: "Temukan rekomendasi perangkat keras PC, laptop, dan gadget terbaik di Wadahtek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="header">
          <div className="container nav-container">
            <Link href="/" className="logo">
              <span style={{ color: "var(--color-accent)" }}>/</span> Wadahtek
            </Link>
            <nav className="nav-links">
              <Link href="/">Beranda</Link>
              <Link href="/kategori/pc">Rakitan PC</Link>
              <Link href="/kategori/vga">VGA</Link>
            </nav>
          </div>
        </header>
        
        <main style={{ minHeight: "calc(100vh - 200px)" }}>
          {children}
        </main>
        
        <footer className="footer">
          <div className="container">
            <p className="mono">© {new Date().getFullYear()} Wadahtek. All rights reserved.</p>
            <p style={{ marginTop: "0.5rem" }}>
              Situs ini didukung oleh pembaca. Jika Anda membeli melalui tautan di situs kami, kami dapat memperoleh komisi afiliasi.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
