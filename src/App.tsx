import { useState } from "react";
import Navbar from "./components/Navbar";
import Checkout from "./pages/checkout.tsx";
import ProductPage from "./pages/productPage";
import { CartProvider } from "./utils/cart.tsx";
import { Routes, Route } from "react-router-dom";

interface CardItemProps {
  title: string;
  price: number;
  image: string;
  id: number;
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<CardItemProps[]>([]);
  const filteredProducts = (products: CardItemProps[]) => {
    setSelectedProduct(products);
  }
  return (
    <>
      <CartProvider>
        <Navbar sendProducts={filteredProducts} />
        <Routes>
          <Route path="/" element={<ProductPage filteredProducts={selectedProduct}/>} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
