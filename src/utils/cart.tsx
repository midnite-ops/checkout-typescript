import { createContext, useContext, useState, useEffect } from "react";
import { useProduct } from "../data/products.ts";
type Cart = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

const cartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
    const { products } = useProduct();
    const [cart, setCart] = useState<Cart[]>(() => {
        const saved = loadCart();
        return saved;
    });

    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    function addToCart(id: number, itemQuantity: number) {
        const product = products.find((product) => product.id === id);
        if (!product) {
            console.log("Product not found");
            return;
        }
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);
            if (existingItem) {
            return prevCart.map((item) =>
                item.id === existingItem.id
                ? { ...item, quantity: item.quantity + itemQuantity }
                : item
            );
            } else {
            return [
                ...prevCart,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: itemQuantity,
                    image: product.image,
                },
            ];
            }
        });
    }

    function updateQuantity(id:number, newQuantity:number){
        setCart((prev) => {
            return prev.map((item) => item.id === id ? {...item, quantity: newQuantity} : item)
        })
    }

    function deleteItem(id:number){
        setCart((prev) => {
            return prev.filter((item) => item.id !== id)
        })
		saveToStorage()
    }

    function saveToStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function loadCart() {
		const getCart = JSON.parse(localStorage.getItem("cart") || "[]");
		return getCart;
    }

    useEffect(() => {
		const total = cart.reduce((sum, item) => item.quantity + sum, 0);
		setTotalQuantity(total);
		saveToStorage();
    }, [cart]);

    return (
    <cartContext.Provider value={{ cart, addToCart, totalQuantity, deleteItem, updateQuantity }}>
        {children}
    </cartContext.Provider>
    );
}
export function useCart() {
    return useContext(cartContext);
}
