import s from './Welcome_page.module.css';
import image from '../../assets/home_screen_main_image.png'
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <>
            <div className='w-full py-10' >
                <div className='flex flex-col justify-around items-center gap-28 '>
                    <div className=''>
                        <p className='py-4 text-5xl font-bold font-sans'>All links at your username.</p>
                        <p className='text-xl py-2'>One link for every other links. Now Share all your links by your username.</p>
                        < div className='flex flex-row gap-2'>
                            <Link to="/user/login" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer  text-center hover:border-slate-100  ${s.link}`}>Already a user?</Link>
                            <Link to='/user/register' className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer  text-center hover:border-slate-100  ${s.get_started}`}>Get Started</Link>
                        </div>
                    </div>
                    <img className='w-full' src={image}></img>
                </div>
                <div className='h-svh flex justify-center items-center'>
                    <p className='py-4 text-justify'>Share your favorite websites and links with ease using UniUrl. Whether you're a researcher, content creator, or simply want to save and organize your digital discoveries, we've got you covered.</p>
                </div>
            </div>
        </>
    );
}

export default WelcomePage;