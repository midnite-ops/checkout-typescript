import { useCart } from "../utils/cart";
import dayjs from "dayjs";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";
import OrderSummary from "../components/OrderSummary";
import { useEffect } from "react";

//Note to self, fix the deliveryDate funcitonality
interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    deliveryDate?: {date: string, price: number}
}
function Checkout(){
    const { cart, deleteItem, updateQuantity, updateDelivery } = useCart();
    
    //Set every cart item to have a default delivery date of 7 days from now, and price of 0. This will be updated when the user selects a delivery option, but this way we can ensure that every item has a delivery date and price for the order summary and total price calculation
    useEffect(() => {
        cart.forEach((item: CartItem) => {
            if(!item.deliveryDate){
                const freeShopping = deliveryOptions[0]
                updateDelivery(item.id, freeShopping.deliveryDate, freeShopping.price)
            }
        })
        console.log(cart)
    }, [cart])

    const deliveryOptions = [
        { id: 1, name: "Free Shipping", price: 0, estimatedDays: 7},
        { id: 2, name: "$4.99 - Shipping", price: 4.99, estimatedDays: 3},
        { id: 3, name: "$9.99 - Shipping", price: 9.99, estimatedDays: 1 },
    ].map((option) => ({
        ...option, deliveryDate: dayjs().add(option.estimatedDays, 'day').format('dddd, MMMM D')
    }))
    
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newQuantity, setNewQuantity] = useState<number>()

    const handleUpdate = (item: CartItem) => {
        setEditingId(item.id);
        setNewQuantity(item.quantity);
    }

    const handleSaveNewQuantity = (id:number) => {
        if(newQuantity === undefined || newQuantity < 1) return;
        updateQuantity(id, newQuantity)
        setEditingId(null);
    }
    

    const handleDateChange = (id:number, price:number, date:string) => {
        updateDelivery(id, date, price);
    };


    return(
        <main className="py-10 px-30">
            <h1 className="font-bold text-3xl">Review Your Order</h1>
            <section className="flex gap-10 items-start">
                <div className="w-[70%] py-10">
                    {cart.map((cartItem: CartItem) => (
                        <div key={cartItem.id} className="border py-3 px-15 mb-10">
                            <h1 className="font-bold text-lg mb-5 text-green-700">Delivery Date: {cartItem.deliveryDate?.date || "Pick a delivery option"}</h1>
                            <div className="flex w-full  gap-5">
                                <img src={cartItem.image} alt={cartItem.title} className="w-30 h-34 object-contain  "/>
                                <div className="flex flex-col gap-2 w-[299px]">
                                    <h2 className="font-bold w-[70%]">{cartItem.title}</h2>
                                    <p className="text-red-800 font-bold">{formatCurrency(cartItem.price)}</p>
                                    <div className="flex gap-2">
                                        <p>Quantity: {editingId === cartItem.id ? <input className="border w-10" onChange={(e) => {setNewQuantity(Number(e.target.value))}} value={newQuantity} /> : cartItem.quantity}</p>
                                        {editingId === cartItem.id ? (
                                            <p className="text-blue-400 cursor-pointer hover:text-blue-300" onClick={() => handleSaveNewQuantity( cartItem.id)}>
                                                Save
                                            </p>
                                        ): (
                                            <p className="text-blue-400 cursor-pointer hover:text-blue-300" onClick={() => handleUpdate(cartItem)} id={`delivery-${cartItem.id}`}>
                                                Update
                                            </p>
                                        )}
                                        <p className="text-blue-400 cursor-pointer hover:text-blue-300" onClick={() => {deleteItem(cartItem.id)}}>Delete</p>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="mb-3 font-bold">Choose a delivery option:</h1>
                                    <div className="flex flex-col gap-3">
                                        {deliveryOptions.map((item) => (
                                            <label htmlFor="" className="flex flex-start gap-3" key={item.id}>
                                                <input type="radio"
                                                 className="w-5" checked={cartItem.deliveryDate?.date === item.deliveryDate || cartItem.deliveryDate === undefined} value={item.deliveryDate} name={`delivery-${cartItem.id}`} onChange={() => handleDateChange(cartItem.id, item.price, item.deliveryDate)}/>
                                                <p className="text-green-700 font-bold">
                                                    {item.deliveryDate}
                                                    <br />
                                                    <span className="text-gray-400 font-light">{item.name}</span>
                                                </p>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <OrderSummary />
            </section>
            
        </main>
    ) 
}

export default Checkout;