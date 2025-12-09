import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { count: number };
}

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try{
        const res = await fetch("https://fakestoreapi.com/products");
        const json = await res.json();
        setProducts(json);
        setLoading(false)
      }catch(e){
          console.log(`Error message: ${e}`)
      }
    }
    load();
    
  }, []);

  return {products, loading};
}
