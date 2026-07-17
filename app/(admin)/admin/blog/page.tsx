"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import postsData from "../../../../data/posts.json";
import Link from "next/link";

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = postsData.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (title: string) => {
    alert(`(Dummy) Anda mencoba menghapus artikel: ${title}\\nFitur ini membutuhkan API backend untuk mengubah file JSON.`);
  };

  const handleEdit = (title: string) => {
    alert(`(Dummy) Edit mode untuk: ${title}\\nUI Form akan segera datang!`);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Artikel Blog</h1>
        <button 
          onClick={() => alert("(Dummy) Membuka form tambah artikel baru")}
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Plus size={16} />
          Tulis Artikel
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-[var(--text-muted)]" />
            </div>
            <input 
              type="text" 
              placeholder="Cari artikel berdasarkan judul..." 
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
                <th scope="col" className="px-6 py-4 font-medium">Judul Artikel</th>
                <th scope="col" className="px-6 py-4 font-medium">Tanggal</th>
                <th scope="col" className="px-6 py-4 font-medium">Penulis</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <tr key={post.id} className={`${index !== filteredPosts.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-neutral-50 dark:hover:bg-neutral-900/20 transition-colors`}>
                    <td className="px-6 py-4 font-medium text-[var(--foreground)]">
                      <p className="line-clamp-1 mb-1">{post.title}</p>
                      <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-[var(--color-accent)] hover:underline inline-flex items-center gap-1">
                        Lihat di Web <ExternalLink size={12} />
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[var(--text-muted)]">
                      {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(post.title)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(post.title)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                    Tidak ada artikel yang cocok dengan pencarian.
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
