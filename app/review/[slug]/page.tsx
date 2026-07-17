import productsData from "../../../data/products.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  
  if (!product) return { title: 'Tidak Ditemukan | Wadahtek' };
  return {
    title: `${product.name} Review | Wadahtek`,
    description: product.summary,
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: "var(--space-3xl) var(--space-lg)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div className="mono" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-md)" }}>
          <Link href="/">Beranda</Link> / <Link href={`/kategori/${product.category.toLowerCase()}`}>{product.category}</Link> / {product.name}
        </div>
        
        {/* Header */}
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{product.name}</h1>
        <p style={{ fontSize: "1.25rem", color: "var(--color-text-primary)", marginBottom: "var(--space-xl)" }}>
          {product.summary}
        </p>

        {/* Affiliate Main CTA */}
        <a 
          href={product.affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn" 
          style={{ width: "100%", padding: "var(--space-md)", fontSize: "1.125rem", marginBottom: "var(--space-xl)" }}
        >
          Cek Harga di Marketplace
        </a>

        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: "100%", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-2xl)", border: "1px solid var(--color-border)" }} 
        />

        <div className="grid grid-cols-2" style={{ gap: "var(--space-xl)" }}>
          {/* Pros */}
          <div className="card" style={{ padding: "var(--space-lg)" }}>
            <h3 style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>+</span> Kelebihan
            </h3>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--color-text-secondary)" }}>
              {product.pros.map((pro, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{pro}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="card" style={{ padding: "var(--space-lg)" }}>
            <h3 style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>-</span> Kekurangan
            </h3>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--color-text-secondary)" }}>
              {product.cons.map((con, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specs */}
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <h2>Spesifikasi Teknis</h2>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden", marginTop: "var(--space-md)" }}>
            {Object.entries(product.specs).map(([key, value], i) => (
              <div 
                key={key} 
                style={{ 
                  display: "flex", 
                  padding: "var(--space-md)", 
                  borderBottom: i !== Object.keys(product.specs).length - 1 ? "1px solid var(--color-border)" : "none",
                  backgroundColor: i % 2 === 0 ? "transparent" : "var(--color-paper)"
                }}
              >
                <div style={{ flex: 1, fontWeight: 500, color: "var(--color-text-secondary)" }}>{key}</div>
                <div style={{ flex: 2 }}>{value as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "var(--space-3xl)", textAlign: "center", padding: "var(--space-2xl)", backgroundColor: "var(--color-paper)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
          <h3 style={{ marginBottom: "var(--space-md)" }}>Tertarik dengan produk ini?</h3>
          <p style={{ marginBottom: "var(--space-lg)" }}>Dapatkan harga terbaik dan dukung Wadahtek dengan membeli melalui link afiliasi kami.</p>
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn" 
          >
            Beli Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
