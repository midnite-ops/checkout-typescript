import Navbar from "./components/Navbar";
import ProductPage from "./pages/productPage";
import { CartProvider } from "./utils/cart.tsx";

function App() {

  return (
    <>
      <CartProvider>
        <Navbar />
        <ProductPage />
      </CartProvider>
      
    </>
  )
}

export default App
