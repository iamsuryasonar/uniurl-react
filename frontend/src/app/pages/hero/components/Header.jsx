import image from '../../../assets/home_screen_main_image.png'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="flex flex-col md:flex-row items-center py-2 md:py-[4rem]" id="home">
            <div className="flex-1 flex justify-center items-start gap-4 flex-col mr-2 text-[#81AFDD]">
                <h1 className="gradient_text text-5xl  font-bold">Simplify URL Sharing with Uniurl</h1>
                <p>Our intuitive interface makes sharing URLs effortless. Simply select a theme, input the URL, add your username, and share instantly. It's that simple!</p>
                <div className="w-full text-white flex flex-row no-wrap">
                    <Link to='/user/register' className={`bg-[#FF4820] hover:bg-white hover:text-black font-bold px-[1rem] py-2 rounded-md transition-colors duration-300`}>Get Started</Link>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <img src={image} />
            </div>
        </div>
    )
}


export default Header;