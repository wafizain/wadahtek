"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../../../../components/admin/ProductForm";
import { supabase } from "../../../../../../lib/supabase";
import { use } from "react";

export default function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) {
        setInitialData(data);
      } else if (error) {
        alert("Produk tidak ditemukan");
        router.push('/admin/produk');
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    const { error } = await supabase.from('products').update(data).eq('id', id);
    
    if (error) {
      alert("Error: " + error.message);
      setIsSaving(false);
    } else {
      router.push('/admin/produk');
      router.refresh();
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-[var(--text-muted)]">Memuat data produk...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
