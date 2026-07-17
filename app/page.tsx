import Link from "next/link";
import productsData from "../data/products.json";

export default function Home() {
  return (
    <div>
      <section className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>Temukan Rekomendasi Hardware Terbaik.</h1>
          <p style={{ fontSize: "1.25rem", marginTop: "var(--space-md)" }}>
            Review jujur, panduan merakit PC, dan rekomendasi gadget terkini.
            Pilihan tepat untuk setup impianmu.
          </p>
          <div style={{ marginTop: "var(--space-xl)", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="#terbaru" className="btn">Lihat Rekomendasi</Link>
            <Link href="/kategori/pc" className="btn btn-outline">Panduan Rakit PC</Link>
          </div>
        </div>
      </section>

      <section id="terbaru" className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-xl)" }}>
            <h2>Rekomendasi Terbaru</h2>
            <Link href="/semua" className="mono" style={{ color: "var(--color-accent)" }}>Lihat Semua →</Link>
          </div>
          
          <div className="grid grid-cols-3">
            {productsData.map((product) => (
              <Link href={`/review/${product.slug}`} key={product.id} className="card">
                <img src={product.image} alt={product.name} className="card-img" />
                <div className="card-body">
                  <span className="mono" style={{ color: "var(--color-accent)", fontSize: "0.75rem" }}>{product.category}</span>
                  <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>{product.name}</h3>
                  <p style={{ fontSize: "0.875rem", marginBottom: 0 }}>{product.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
