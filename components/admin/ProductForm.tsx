"use client";

import { useState } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductForm({ initialData, onSubmit, isLoading }: any) {
  const router = useRouter();
  
  // Format initial object/arrays to be editable in state
  const formatObjToArray = (obj: any) => obj ? Object.entries(obj).map(([k, v]) => ({ key: k, value: v })) : [{ key: "", value: "" }];
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Setup Meja",
    image: initialData?.image || "",
    summary: initialData?.summary || "",
    pros: initialData?.pros?.length ? initialData.pros : [""],
    cons: initialData?.cons?.length ? initialData.cons : [""],
    specs: formatObjToArray(initialData?.specs),
    specs_source_name: initialData?.specs_source?.name || initialData?.specsSource?.name || "",
    specs_source_url: initialData?.specs_source?.url || initialData?.specsSource?.url || "",
    links: formatObjToArray(initialData?.links)
  });

  const handleArrayChange = (field: 'pros' | 'cons', index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: 'pros' | 'cons') => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: 'pros' | 'cons', index: number) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr.length ? newArr : [""] });
  };

  const handleObjChange = (field: 'specs' | 'links', index: number, keyOrValue: 'key' | 'value', val: string) => {
    const newArr = [...formData[field]];
    newArr[index] = { ...newArr[index], [keyOrValue]: val };
    setFormData({ ...formData, [field]: newArr });
  };

  const addObjItem = (field: 'specs' | 'links') => {
    setFormData({ ...formData, [field]: [...formData[field], { key: "", value: "" }] });
  };

  const removeObjItem = (field: 'specs' | 'links', index: number) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr.length ? newArr : [{ key: "", value: "" }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert arrays of {key, value} back to objects
    const specsObj = formData.specs.reduce((acc: any, curr: any) => {
      if (curr.key.trim() !== "") acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    const linksObj = formData.links.reduce((acc: any, curr: any) => {
      if (curr.key.trim() !== "") acc[curr.key] = curr.value;
      return acc;
    }, {});

    const submitData = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      image: formData.image,
      summary: formData.summary,
      pros: formData.pros.filter(p => p.trim() !== ""),
      cons: formData.cons.filter(c => c.trim() !== ""),
      specs: specsObj,
      specs_source: { name: formData.specs_source_name, url: formData.specs_source_url },
      links: linksObj
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/produk" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {initialData ? "Edit Produk" : "Tambah Produk Baru"}
          </h1>
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-[var(--color-accent)] text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-70"
        >
          <Save size={16} />
          {isLoading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Info Dasar */}
        <div className="lg:col-span-2 space-y-6 bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border)] pb-2">Informasi Dasar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Produk *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL) *</label>
              <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ringkasan Pendek *</label>
            <textarea required rows={2} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL Gambar *</label>
              <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori *</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]">
                <option value="Setup Meja">Setup Meja</option>
                <option value="PC Budget">PC Budget</option>
                <option value="Aksesoris">Aksesoris</option>
                <option value="Produktivitas">Produktivitas</option>
              </select>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
            <div className="space-y-3">
              <label className="text-sm font-medium text-emerald-500">Kelebihan (Pros)</label>
              {formData.pros.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={p} onChange={e => handleArrayChange('pros', i, e.target.value)} className="flex-1 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                  <button type="button" onClick={() => removeArrayItem('pros', i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-md"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('pros')} className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1"><Plus size={14} /> Tambah Kelebihan</button>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-rose-500">Kekurangan (Cons)</label>
              {formData.cons.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={c} onChange={e => handleArrayChange('cons', i, e.target.value)} className="flex-1 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                  <button type="button" onClick={() => removeArrayItem('cons', i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-md"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('cons')} className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1"><Plus size={14} /> Tambah Kekurangan</button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Spesifikasi & Links */}
        <div className="space-y-6">
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b border-[var(--border)] pb-2">Spesifikasi</h2>
            {formData.specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" placeholder="Key (ex: Socket)" value={s.key} onChange={e => handleObjChange('specs', i, 'key', e.target.value)} className="w-1/3 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                <input type="text" placeholder="Value (ex: AM4)" value={s.value} onChange={e => handleObjChange('specs', i, 'value', e.target.value)} className="flex-1 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                <button type="button" onClick={() => removeObjItem('specs', i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-md"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => addObjItem('specs')} className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1"><Plus size={14} /> Tambah Baris Spek</button>
            
            <div className="pt-4 mt-4 border-t border-[var(--border)] space-y-3">
              <label className="text-sm font-medium">Sumber Data Spesifikasi</label>
              <input type="text" placeholder="Nama Situs (ex: TechPowerUp)" value={formData.specs_source_name} onChange={e => setFormData({...formData, specs_source_name: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
              <input type="url" placeholder="URL Situs" value={formData.specs_source_url} onChange={e => setFormData({...formData, specs_source_url: e.target.value})} className="w-full p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
            </div>
          </div>

          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b border-[var(--border)] pb-2">Link Afiliasi</h2>
            {formData.links.map((l, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" placeholder="Toko (shopee/tokopedia)" value={l.key} onChange={e => handleObjChange('links', i, 'key', e.target.value)} className="w-1/3 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                <input type="url" placeholder="https://..." value={l.value} onChange={e => handleObjChange('links', i, 'value', e.target.value)} className="flex-1 p-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] rounded-md focus:outline-none" />
                <button type="button" onClick={() => removeObjItem('links', i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-md"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => addObjItem('links')} className="text-xs font-medium text-[var(--color-accent)] flex items-center gap-1"><Plus size={14} /> Tambah Link Toko</button>
          </div>
        </div>
      </div>
    </form>
  );
}
