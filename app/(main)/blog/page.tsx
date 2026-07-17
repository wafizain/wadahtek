import postsData from "../../../data/posts.json";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Artikel Teknologi Terbaru | Wadahtek",
  description: "Kumpulan artikel, panduan rakit PC, dan berita teknologi terkini untuk membantu Anda menemukan perangkat keras terbaik.",
  keywords: "blog wadahtek, berita teknologi, panduan rakit pc, review gadget",
  openGraph: {
    title: "Blog & Artikel Teknologi Terbaru | Wadahtek",
    description: "Kumpulan artikel, panduan rakit PC, dan berita teknologi terkini untuk membantu Anda menemukan perangkat keras terbaik.",
    type: "website",
  }
};

export default function BlogIndexPage() {
  return (
    <div className="py-16 md:py-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog & Artikel</h1>
        <p className="text-lg text-[var(--text-muted)] mb-12">
          Baca panduan terbaru, tips rakit PC, dan ulasan teknologi dari tim Wadahtek.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {postsData.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col h-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--color-accent)] transition-all">
              <div className="text-xs font-mono text-[var(--text-muted)] mb-3">
                {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--text-muted)] mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="text-sm font-medium text-[var(--color-accent)] mt-auto flex items-center gap-1">
                Baca selengkapnya <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
