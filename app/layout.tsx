import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Wadahtek | Rekomendasi Tech Budget & Setup",
  description: "Rekomendasi aksesoris HP/laptop, PC build, dan setup meja terbaik dengan budget terjangkau untuk pelajar, mahasiswa, dan pekerja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[var(--color-accent)] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
