import { useState } from 'react';
import cart from '../assets/cart-icon.svg';
import { useProduct } from '../data/products.ts';
import { useCart } from '../utils/cart.tsx';


type Props = {
    sendProducts: (products: {title: string, price: number, image: string, id: number}[]) => void;
}

function Navbar({sendProducts}: Props) {
    const { totalQuantity } = useCart()
    const { products } = useProduct();
    const [query, setQuery] = useState<string>("")

    const filteredProducts = products.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
       
   
    return (
        <nav className="navbar bg-black/90 text-white flex justify-between items-center py-7 px-10 relative">
            <div>
                <p className='font-bold text-2xl'>Amazon</p>
            </div>
            <div className='w-1/2'>
                <input type="text" placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        sendProducts(filteredProducts);
                        console.log(filteredProducts)
                    }
                }} className='bg-white text-black w-full rounded py-2 px-5' />
            </div>
            <div className='flex items-center gap-6'>
                <p>Returns <br /> & Orders</p>
                <div className='cursor-pointer'>
                    <a href="/checkout">
                        <img src={cart} className='w-10' alt="a cart image" />
                    </a>
                </div>
            </div>
            {totalQuantity > 0 && (
                <div className='absolute top-3 right-12.5'>
                    <div className='bg-yellow-500 p-3 w-5 h-5 font-bold text-black flex justify-center items-center rounded-full'>{totalQuantity}</div>
                </div>
            )}
            
        </nav>
    )
}

export default Navbar