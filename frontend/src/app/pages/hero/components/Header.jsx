import { Link } from "react-router-dom";
import image from '../../../assets/home_screen_main_image.webp'

function Header() {
    return (
        <div className="h-full grid grid-cols-[auto] md:grid-cols-[1fr_1fr] items-center py-2 md:py-[4rem]" id="home">
            <div className="flex-1 flex justify-center items-start gap-4 flex-col mr-2 text-black">
                <h1 className="text-5xl font-extrabold text-balance">Simplify URL Sharing with Uniurl</h1>
                <p className='text-slate-600'>Our intuitive interface makes sharing URLs effortless. Simply select a theme, input the URL, add your username, and share instantly. It's that simple!</p>
                <div className="w-full text-black flex flex-row no-wrap">
                    <Link to='/user/register' className={`bg-[#FF4820] text-white border-[1px] border-[#FF4820]  hover:bg-white hover:text-black font-bold px-4 py-1 rounded-full transition-colors duration-300`}>Get Started</Link>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <img src={image} className=" max-h-[400px]" alt='banner' />
            </div>
        </div>
    )
}

export default Header;