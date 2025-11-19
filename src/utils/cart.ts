import { useProduct } from "../assets/data/products.ts";
type Cart = {
    id: number;
    title: string;
    price: number;
    quantity: number;
}
export const cart: Cart[] = [];


export function addToCart(id:number, itemQuantity:number){
    const products = useProduct()
    products.map((item) => {
        if(item.id === id){
            cart.push({
                title: item.title,
                id: item.id,
                price: item.price,
                quantity: itemQuantity
            })
        }
    })
}

export function totalQuantity(){
    let total:number = 0
    cart.forEach((item) => {
        total += item.quantity
    })
    return total
}