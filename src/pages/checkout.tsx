import { useCart } from "../utils/cart";
import dayjs from "dayjs";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";
type Cart = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    deliveryDate: string;
}
function Checkout(){
    const { cart } = useCart();

    const now = dayjs().format('DD, MMMM, YYYY');
    console.log(now)

    const deliveryOptions = [
        { id: 1, name: "Free Shipping", price: 0, estimatedDays: 7},
        { id: 2, name: "$4.99 - Shipping", price: 4.99, estimatedDays: 3},
        { id: 3, name: "$9.99 - Shipping", price: 9.99, estimatedDays: 1 },
    ].map((option) => ({
        ...option, deliveryDate: dayjs().add(option.estimatedDays, 'day').format('dddd, MMMM D')
    }))

    // Stores selected delivery for each item
    const [selectedDelivery, setSelectedDelivery] = useState<Record<number, string>>({});

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const id = Number(e.target.name.split("-")[1]);

        setSelectedDelivery((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    return(
        <main className="py-10 px-30">
            <h1 className="font-bold text-3xl">Review Your Order</h1>
            <section className="flex gap-10 items-start">
                <div className="w-[70%] py-10">
                    {cart.map((cartItem: Cart) => (
                        <div key={cartItem.id} className="border py-3 px-15 mb-10">
                            <h1 className="font-bold text-lg mb-5 text-green-700">Delivery Date: {selectedDelivery[cartItem.id] || "Pick a delivery option"}</h1>
                            <div className="flex w-full  gap-5">
                                <img src={cartItem.image} alt={cartItem.title} className="w-30 h-34 object-contain  "/>
                                <div className="flex flex-col gap-2 w-[299px]">
                                    <h2 className="font-bold w-[70%]">{cartItem.title}</h2>
                                    <p className="text-red-800 font-bold">{formatCurrency(cartItem.price)}</p>
                                    <div className="flex gap-2">
                                        <p>Quantity: {cartItem.quantity}</p>
                                        <p className="text-blue-400 cursor-pointer hover:text-blue-300">Update</p>
                                        <p className="text-blue-400 cursor-pointer hover:text-blue-300">Delete</p>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="mb-3 font-bold">Choose a delivery option:</h1>
                                    <div className="flex flex-col gap-3">
                                        {deliveryOptions.map((item) => (
                                            <label htmlFor="" className="flex flex-start gap-3" key={item.id}>
                                                <input type="radio" className="w-5" value={item.deliveryDate} name={`delivery-${cartItem.id}`} onChange={handleDateChange}/>
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
                <div className=" w-[30%]">fish and beans</div>
            </section>
            
        </main>
    ) 
}

export default Checkout;