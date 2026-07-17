import { Package, FileText, TrendingUp, Users } from "lucide-react";
import { supabase } from "../../../lib/supabase";

export default async function AdminDashboardPage() {
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total Produk</p>
              <h3 className="text-3xl font-bold mt-1">{productsCount || 0}</h3>
            </div>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Package size={20} />
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-medium">+2</span> sejak bulan lalu
          </div>
        </div>

        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Artikel Blog</p>
              <h3 className="text-3xl font-bold mt-1">{postsCount || 0}</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <FileText size={20} />
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-medium">+1</span> minggu ini
          </div>
        </div>

        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total Klik Link</p>
              <h3 className="text-3xl font-bold mt-1">1,249</h3>
            </div>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            <span className="text-emerald-500 font-medium">+12%</span> dari minggu lalu
          </div>
        </div>

        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Pengunjung Unik</p>
              <h3 className="text-3xl font-bold mt-1">452</h3>
            </div>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Users size={20} />
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Hanya estimasi (Dummy)
          </div>
        </div>
      </div>
    </div>
  );
}
