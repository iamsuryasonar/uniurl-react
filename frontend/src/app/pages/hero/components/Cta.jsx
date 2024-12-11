import { Link } from "react-router-dom";

function CTA() {
    return <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 my-6 md:my-10 gradient_bar text-black py-6 px-4 md:py-8 md:px-6 rounded-md'>
        <p className='font-bold text-lg'>Ready to simplify your URL management? Sign up now and start sharing!</p>
        <Link to='/user/register' className={`w-fit text-center bg-black font-normal text-white hover:bg-white hover:text-black px-4 py-1 text-nowrap rounded-full transition-colors duration-300 shadow-lg`}>Get Started</Link>
    </div>
}

export default CTA;