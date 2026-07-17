"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { supabase } from "../../../../lib/supabase";
import Link from "next/link";

export default function AdminProdukPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProductsData(data);
    setIsLoading(false);
  };

  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk: ${name}?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        fetchProducts(); // Refresh data
      } else {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Produk</h1>
        <Link 
          href="/admin/produk/tambah"
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Plus size={16} />
          Tambah Produk
        </Link>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-[var(--text-muted)]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[var(--text-muted)] uppercase bg-neutral-50 dark:bg-neutral-900/50 border-b border-[var(--border)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Nama Produk</th>
                <th scope="col" className="px-6 py-4 font-medium">Kategori</th>
                <th scope="col" className="px-6 py-4 font-medium text-center">Reviews</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                    Memuat data dari Supabase...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className={`${index !== filteredProducts.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-neutral-50 dark:hover:bg-neutral-900/20 transition-colors`}>
                    <td className="px-6 py-4 font-medium text-[var(--foreground)]">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-[var(--border)]" />
                        <div>
                          <p className="line-clamp-1">{product.name}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-[var(--text-muted)] border border-[var(--border)]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.userReviews ? product.userReviews.length : 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/produk/edit/${product.id}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                    Tidak ada produk yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
