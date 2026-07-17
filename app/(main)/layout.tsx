import Link from "next/link";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Search } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
              <span className="text-[var(--color-accent)]">/</span> Wadahtek
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Beranda</Link>
              <Link href="/blog" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
              <Link href="/kategori/setup-meja" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Setup Meja</Link>
              <Link href="/kategori/pc-budget" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">PC Budget</Link>
              <Link href="/kategori/aksesoris" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Aksesoris</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-[var(--text-muted)]" />
              </div>
              <input 
                type="text" 
                placeholder="Cari produk..." 
                className="block w-full pl-9 pr-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-900 border border-[var(--border)] rounded-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] placeholder:text-[var(--text-muted)] text-[var(--foreground)] transition-colors"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-[var(--border)] py-12 mt-16 text-center text-[var(--text-muted)] text-sm">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono uppercase tracking-widest mb-2">© {new Date().getFullYear()} Wadahtek. All rights reserved.</p>
          <p className="mt-4 opacity-75">Platform rekomendasi Tech Budget & Setup terpercaya untuk pelajar, gamer hemat, dan produktivitas.</p>
        </div>
      </footer>
    </div>
  );
}
