"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../../../components/admin/ProductForm";
import { supabase } from "../../../../../lib/supabase";

export default function TambahProdukPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const { error } = await supabase.from('products').insert([data]);
    
    if (error) {
      alert("Error: " + error.message);
      setIsLoading(false);
    } else {
      router.push('/admin/produk');
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
