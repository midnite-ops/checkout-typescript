import { useProduct } from "../data/products.ts";
import { useCart } from "../utils/cart.tsx";
import CardItem from "../components/CardItem";

interface CardItemProps {
  title: string;
  price: number;
  image: string;
  id: number;
}
function ProductPage() {
  const products = useProduct();
  const { addToCart } = useCart();
  return (
    <div className="product-page grid grid-cols-5 gap-4 p-10">
      {products.map((product: CardItemProps) => (
        <CardItem
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
