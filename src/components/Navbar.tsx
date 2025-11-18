
import cart from '../assets/cart-icon.svg';
function Navbar() {
    return (
        <nav className="navbar bg-black/90 text-white flex justify-between items-center py-4 px-10">
            <div>
                <p>Amazon</p>
            </div>
            <div className='w-1/2'>
                <input type="text" placeholder='Search' className='bg-white text-black w-full rounded py-2 px-5' />
            </div>
            <div className='flex items-center gap-6'>
                <p>Returns <br /> & Orders</p>
                <div className='relative'>
                    <img src={cart} className='w-10' alt="a cart image" />
                    <div className='absolute'></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar