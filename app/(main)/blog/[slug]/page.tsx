import postsData from "../../../../data/posts.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData.find((p) => p.slug === slug);
  
  if (!post) return { title: 'Artikel Tidak Ditemukan | Wadahtek' };
  
  return {
    title: `${post.title} | Blog Wadahtek`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 md:py-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-sm text-[var(--text-muted)] mb-6 flex items-center gap-2">
          <Link href="/blog" className="hover:text-[var(--foreground)] transition-colors">Blog</Link>
          <span>/</span>
          <span>{post.date}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-[var(--border)]">
          <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-sm">
            W
          </div>
          <div>
            <div className="font-medium text-sm">{post.author}</div>
            <div className="text-xs text-[var(--text-muted)]">Content Writer</div>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
          {/* Untuk contoh ini, konten statis Markdown dirender secara sederhana (menggunakan tag standar). Untuk produksi, gunakan library seperti react-markdown */}
          {post.content.split('\\n\\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-2xl font-semibold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={index} className="mb-4 leading-relaxed text-[var(--text-muted)]">{paragraph}</p>;
          })}
        </div>
        
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link href="/blog" className="text-[var(--color-accent)] hover:underline font-medium flex items-center gap-2">
            ← Kembali ke Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
