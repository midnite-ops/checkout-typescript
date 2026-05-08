import { useCart } from "../utils/cart";
import { formatCurrency } from "../utils/formatCurrency";
function OrderSummary() {
    const { totalQuantity, totalPrice, totalDeliveryPrice } = useCart()
    const beforeTax = totalPrice() + totalDeliveryPrice();
    const tax = beforeTax / 100 * 10;

    const orderTotal = beforeTax + tax
    return (
        <div className="w-full md:w-[30%] bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center">
                <p className=" font-semibold">Total Items: ({totalQuantity})</p>
                <p className="font-semibold">{formatCurrency(totalPrice())}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
                <p className="font-semibold">Shipping and Handling:</p>
                <p className="font-semibold">{formatCurrency(totalDeliveryPrice())}</p>
            </div>

            <div className="flex justify-between items-center mt-5">
                <p className="font-semibold">Total before tax:</p>
                <p className="font-semibold">{formatCurrency(beforeTax)}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
                <p className="font-semibold">Estimated Tax (10%):</p>
                <p className="font-semibold">{formatCurrency(tax)}</p>
            </div>

            <hr className="text-gray-400 my-8"/>

            <div className="flex justify-between items-center mt-2 text-gray-500 mb-5">
                <p className="font-semibold">Order Total:</p>
                <p className="font-semibold">{formatCurrency(orderTotal)}</p>
            </div>

            <button className="bg-black text-white w-full rounded-md py-2 cursor-pointer">Place Order</button>

            {/* Order summary details will go here */}
        </div>
    );
}

export default OrderSummary;