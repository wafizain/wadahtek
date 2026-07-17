import Link from "next/link";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { LayoutDashboard, Package, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border)] bg-[var(--background)] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
          <Link href="/admin" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-[var(--color-accent)]">/</span> Admin Panel
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            <LayoutDashboard size={18} className="text-[var(--text-muted)]" />
            Dashboard
          </Link>
          <Link href="/admin/produk" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            <Package size={18} className="text-[var(--text-muted)]" />
            Produk
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            <FileText size={18} className="text-[var(--text-muted)]" />
            Blog Artikel
          </Link>
        </div>
        
        <div className="p-4 border-t border-[var(--border)] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden font-bold">Wadahtek Admin</div>
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center font-bold text-sm">
              W
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
