import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function Home() {
  const { data: productsData } = await supabase.from('products').select('*').limit(4).order('created_at', { ascending: false });
  const { data: postsData } = await supabase.from('posts').select('*').limit(2).order('created_at', { ascending: false });

  const products = productsData || [];
  const posts = postsData || [];

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. Hero Section */}
      <section className="border-b border-[var(--border)] py-20 px-6 bg-gradient-to-b from-[var(--background)] to-neutral-50 dark:to-neutral-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Bangun Setup Impian Tanpa Bikin Kantong Jebol.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 leading-relaxed">
            Rekomendasi aksesoris, PC build, dan gadget terbaik dengan budget pelajar & mahasiswa. Pilihan tepat untuk produktivitas dan gaming hemat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#trending" 
              className="px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded-md hover:bg-[var(--color-accent-hover)] transition-colors flex items-center justify-center shadow-sm"
            >
              Lihat yang Lagi Tren
            </Link>
            <Link 
              href="/blog" 
              className="px-6 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] font-medium rounded-md hover:border-[var(--foreground)] transition-colors flex items-center justify-center"
            >
              Baca Tips & Panduan
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Produk Trending Section */}
      <section id="trending" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">🔥 Sedang Trending</h2>
              <p className="text-[var(--text-muted)]">Produk rakit PC dan aksesoris yang paling banyak dicari bulan ini.</p>
            </div>
            <Link href="/semua" className="hidden sm:block font-mono text-sm uppercase tracking-wider text-[var(--color-accent)] hover:underline">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link 
                href={`/review/${product.slug}`} 
                key={product.id} 
                className="group flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden hover:-translate-y-1 hover:border-[var(--color-accent)] transition-all duration-200 shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden border-b border-[var(--border)] bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-[var(--color-accent)] mb-1 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-semibold mb-1 line-clamp-2 leading-snug">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/semua" className="text-[var(--color-accent)] font-medium hover:underline">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Kategori Pilihan (SEO Optimized) */}
      <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/30 border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Jelajahi Berdasarkan Kategori</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Setup Meja", desc: "Temukan ide dan rekomendasi lampu monitor, desk mat, serta ornamen untuk setup estetik.", link: "/kategori/setup-meja" },
              { title: "PC Budget", desc: "Panduan merakit PC gaming dan produktivitas dengan komponen murah tapi bertenaga.", link: "/kategori/pc-budget" },
              { title: "Aksesoris", desc: "Rekomendasi keyboard mekanikal, mouse, dan headset gaming terbaik di kelas budget.", link: "/kategori/aksesoris" },
              { title: "Produktivitas", desc: "Gadget wajib penunjang kuliah dan kerja seperti USB Hub, charger cepat, dan stand laptop.", link: "/kategori/produktivitas" }
            ].map((cat, i) => (
              <Link href={cat.link} key={i} className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover:border-[var(--color-accent)] transition-colors">
                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Artikel & Panduan Terbaru (Blog Feed) */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Panduan & Tips Terbaru</h2>
              <p className="text-[var(--text-muted)]">Baca artikel tutorial rakit PC dan tips merapikan meja.</p>
            </div>
            <Link href="/blog" className="hidden sm:block font-mono text-sm uppercase tracking-wider text-[var(--color-accent)] hover:underline">
              Semua Artikel →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post: any) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col h-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--color-accent)] transition-all">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-3">
                  {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
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
      </section>

      {/* 5. FAQ (Frequently Asked Questions) */}
      <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/30 border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Pertanyaan Populer (FAQ)</h2>
          <div className="space-y-4">
            <details className="group bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-[var(--foreground)]">
                Berapa budget minimal untuk rakit PC gaming pelajar?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                Untuk kebutuhan game e-sports ringan seperti Valorant dan tugas sekolah/kuliah, budget sekitar Rp 4 hingga 5 juta sudah sangat memadai dengan menggunakan prosesor AMD seri APU (tanpa VGA eksternal) seperti Ryzen 5 4600G atau 5600G.
              </p>
            </details>
            <details className="group bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-[var(--foreground)]">
                Apa saja perlengkapan wajib untuk setup meja estetik?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                Tiga hal utama yang bisa seketika mengubah tampilan meja belajarmu: Manajemen kabel (cable organizer), lampu monitor (monitor light bar) untuk mengurangi silau, dan alas meja ukuran besar (desk mat). Ketiganya bisa didapatkan dengan budget di bawah Rp 500 ribu.
              </p>
            </details>
            <details className="group bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-[var(--foreground)]">
                Apakah semua link produk di Wadahtek aman?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                Ya! Kami secara ketat melakukan kurasi toko dari marketplace terpercaya (Shopee, Tokopedia, TikTok Shop) dengan rating tinggi, ulasan positif, dan bergaransi resmi untuk memastikan keamanan transaksi audiens kami.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. Tentang Wadahtek (E-E-A-T Signal) */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Misi Kami di Wadahtek</h2>
          <p className="text-[var(--text-muted)] leading-relaxed text-lg">
            Wadahtek adalah platform kurasi terpercaya yang berdedikasi untuk membantu pelajar, mahasiswa, dan gamer hemat di Indonesia menemukan perangkat keras teknologi terbaik. Dari komponen rakit PC yang ramah kantong hingga aksesori setup meja yang meningkatkan produktivitas, kami menyajikan ulasan jujur dan panduan langkah-demi-langkah agar Anda dapat membuat keputusan pembelian yang cerdas tanpa melebihi budget.
          </p>
        </div>
      </section>
    </div>
  );
}
