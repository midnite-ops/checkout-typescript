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
  const [error, setError] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>('Loading... Please wait');
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    async function load(){
      try{
        const res = await fetch("https://fakestoreapi.com/products")
        if(!res.ok){
          throw new Error('Failed to fetch products')
        }
        const data = await res.json()
        setProducts(data)
      }catch(e:any){
        setError(true)
        setLoadingMessage(e.message || 'Failed to fetch products, please try again')
      }finally{
        setLoading(false)
      }
    }

    load()
    
  }, []);

  return {products, error, loading, loadingMessage};
}

//"https://fakestoreapi.com/products"
