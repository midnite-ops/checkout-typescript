import { useProduct } from "../data/products.ts";
import { useCart } from "../utils/cart.tsx";
import CardItem from "../components/CardItem";

interface CardItemProps {
  title: string;
  price: number;
  image: string;
  id: number;
}
function ProductPage({filteredProducts} : {filteredProducts: CardItemProps[]}) {
  const { products, error, loading, loadingMessage } = useProduct();
  const { addToCart } = useCart();
  if(loading){
    return <div className="flex items-center justify-center h-screen overflow-hidden">{loadingMessage}</div>
  }
  if(error){
    return <div className="flex items-center justify-center h-screen overflow-hidden">{loadingMessage}</div>
  }
  return (
    <div className="product-page grid grid-cols-5 gap-4 p-10">
      {filteredProducts.length > 0 ? filteredProducts.map((product:CardItemProps) => (
        <CardItem
          key={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          id={product.id}
          onclick={addToCart}
        />
      )) : products.map((product: CardItemProps) => (
        <CardItem
        key={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          id={product.id}
          onclick={addToCart}
        />
      ))}
    </div>
    
  );
}

export default ProductPage;
