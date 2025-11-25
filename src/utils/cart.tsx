import { createContext, useContext, useState } from "react";
import { useProduct } from "../assets/data/products.ts";
type Cart = {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

const cartContext = createContext<any>(null);
export function CartProvider({children}: any){
    const products = useProduct()
    const [cart, setCart] = useState<Cart[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>()
    function addToCart(id:number, itemQuantity:number){
        products.map((item) => {
            if(item.id === id){
                setCart((prevCart) => (
                    [...prevCart, { title: item.title, id: item.id, price: item.price, quantity: itemQuantity}]
                ))
            }
        })
        setTotalQuantity(total())
    }
    function total(){
        let total:number = 0
        cart.forEach((item) => {
            total += item.quantity
        })
        return total
    }

    return(
        <cartContext.Provider value={{cart, addToCart, totalQuantity}}>
            {children}
        </cartContext.Provider>
    )

}
export function useCart(){
    return useContext(cartContext)
}