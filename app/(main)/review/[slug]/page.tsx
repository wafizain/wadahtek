import Link from "next/link";
import { ShoppingBag, Store, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "../../../../lib/supabase";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();
  
  if (!product) return { title: 'Tidak Ditemukan | Wadahtek' };
  return {
    title: `${product.name} Review | Wadahtek`,
    description: product.summary,
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();

  if (!product) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 px-6 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="font-mono text-sm text-[var(--text-muted)] mb-6 flex flex-wrap gap-2 items-center">
          <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Beranda</Link> 
          <span>/</span> 
          <Link href={`/kategori/${product.category.toLowerCase()}`} className="hover:text-[var(--foreground)] transition-colors">
            {product.category}
          </Link> 
          <span>/</span> 
          <span className="text-[var(--foreground)]">{product.name}</span>
        </div>
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {product.name}
        </h1>
        <p className="text-lg md:text-xl text-[var(--foreground)] mb-10 leading-relaxed">
          {product.summary}
        </p>

        {/* Affiliate Main CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a 
            href={product.links?.shopee || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center h-16 bg-white border border-[var(--border)] rounded-md hover:border-[#ee4d2d] hover:shadow-md transition-all shadow-sm p-3"
          >
            <img src="/shopee.png" alt="Beli di Shopee" className="h-full w-auto object-contain" />
          </a>
          <a 
            href={product.links?.tokopedia || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center h-16 bg-white border border-[var(--border)] rounded-md hover:border-[#00AA5B] hover:shadow-md transition-all shadow-sm p-3"
          >
            <img src="/tokopedia.png" alt="Beli di Tokopedia" className="h-full w-auto object-contain" />
          </a>
          <a 
            href={product.links?.tiktok || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center h-16 bg-white border border-[var(--border)] rounded-md hover:border-black dark:hover:border-neutral-500 hover:shadow-md transition-all shadow-sm p-3"
          >
            <img src="/tiktok.png" alt="Beli di TikTok Shop" className="h-full w-auto object-contain" />
          </a>
        </div>

        {/* Product Image */}
        <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden border border-[var(--border)] mb-16">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pros */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8">
            <h3 className="text-emerald-500 font-semibold text-lg flex items-center gap-2 mb-4">
              <span className="text-xl leading-none">+</span> Kelebihan
            </h3>
            <ul className="space-y-3 text-[var(--text-muted)] list-disc list-inside">
              {product.pros.map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8">
            <h3 className="text-rose-500 font-semibold text-lg flex items-center gap-2 mb-4">
              <span className="text-xl leading-none">-</span> Kekurangan
            </h3>
            <ul className="space-y-3 text-[var(--text-muted)] list-disc list-inside">
              {product.cons.map((con, i) => (
                <li key={i}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Spesifikasi Teknis</h2>
          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div 
                key={key} 
                className={`flex flex-col sm:flex-row sm:items-center p-4 md:p-5 ${
                  i !== Object.keys(product.specs).length - 1 ? "border-b border-[var(--border)]" : ""
                } ${i % 2 === 0 ? "bg-transparent" : "bg-[var(--card)]"}`}
              >
                <div className="flex-1 font-medium text-[var(--text-muted)] mb-1 sm:mb-0">{key}</div>
                <div className="flex-[2] text-[var(--foreground)]">{value as string}</div>
              </div>
            ))}
          </div>
          {(product as any).specsSource && (
            <div className="mt-3 text-right">
              <a 
                href={(product as any).specsSource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
              >
                Sumber Spesifikasi: {(product as any).specsSource.name} <span className="opacity-70">↗</span>
              </a>
            </div>
          )}
        </div>

        {/* User Reviews */}
        {product.userReviews && product.userReviews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Ulasan Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.userReviews.map((review: any, i: number) => (
                <div key={i} className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] flex flex-col shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-[var(--foreground)]">{review.name}</div>
                      <div className="text-xs font-mono text-[var(--color-accent)]">{review.marketplace}</div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} className={`w-4 h-4 ${idx < review.rating ? "fill-current" : "fill-neutral-300 dark:fill-neutral-700"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
