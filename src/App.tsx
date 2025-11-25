import Navbar from "./components/Navbar";
import Checkout from "./pages/checkout.tsx";
import ProductPage from "./pages/productPage";
import { CartProvider } from "./utils/cart.tsx";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
