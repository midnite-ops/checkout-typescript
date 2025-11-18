import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import { cart }from "../utils/cart";

interface CardItemProps {
    title: string;
    price: number;
    image: string;
    id: number;
}
function ProductPage() {
    const [products, setProducts] = useState<CardItemProps[]>([]);
    const addToCart = (id:number, quantity:number) => {
        cart.push()
    }

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
    <div className="product-page grid grid-cols-5 gap-4 p-10">
        {products.map((product) => (
            <CardItem 
                title={product.title} 
                price={product.price} 
                image={product.image} 
                id={product.id}
                onclick= {addToCart}
            />
        ))}
    </div>
  )
}

export default ProductPage