import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";

interface CardItemProps {
    title: string;
    price: number;
    image: string;
    rating: {count: number, rate: number};
}
function ProductPage() {
    
     const [products, setProducts] = useState<CardItemProps[]>([]);

    async function fetchProducts() {
        try{
            const productsData = await fetch('https://fakestoreapi.com/products');
            const productsJson = await productsData.json();
            setProducts(productsJson);
        }catch(error){
            console.error('Error fetching products:', error);
        }
        console.log(products);
    }
    useEffect(() => {
        fetchProducts();
    })
  return (
    <div className="product-page grid grid-cols-6 gap-4 p-10">
        {products.map((product) => (
            <CardItem 
                title={product.title} 
                price={product.price} 
                image={product.image} 
                rating={product.rating.count}
            />
        ))}
      
    </div>
  )
}

export default ProductPage