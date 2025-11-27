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

  useEffect(() => {
    async function load() {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    }
    load();
  }, []);

  return products;
}
