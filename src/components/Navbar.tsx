import cart from '../assets/cart-icon.svg';
import { useCart } from '../utils/cart.tsx';
function Navbar() {
    const { totalQuantity } = useCart()
    return (
        <nav className="navbar bg-black/90 text-white flex justify-between items-center py-7 px-10 relative">
            <div>
                <p className='font-bold text-2xl'>Amazon</p>
            </div>
            <div className='w-1/2'>
                <input type="text" placeholder='Search' className='bg-white text-black w-full rounded py-2 px-5' />
            </div>
            <div className='flex items-center gap-6'>
                <p>Returns <br /> & Orders</p>
                <div >
                    <img src={cart} className='w-10' alt="a cart image" />
                </div>
            </div>
            {totalQuantity > 0 && (
                <div className='absolute top-3 right-12.5'>
                    <div className='bg-yellow-500 w-5 h-5 font-bold text-black flex justify-center items-center rounded-full'>{totalQuantity}</div>
                </div>
            )}
            
        </nav>
    )
}

export default Navbar