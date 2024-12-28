import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearMessage, setMessage } from '../../../store/slices/messageSlice';
import avatar from '../../../assets/avatar.jpg';
import { Transition } from 'react-transition-group';
import s from './../urls.module.css';

function StickyNav({ elementRef, urlsinfo }) {

    const dispatch = useDispatch();
    const [isSticky, setIsSticky] = useState(false);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const itemOffset = elementRef.current.offsetTop;
            const scrollTop = window.scrollY;

            if (scrollTop >= itemOffset) {
                setIsSticky(true)
            } else if (scrollTop < itemOffset) {
                setIsSticky(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const copyToClipboard = async (username) => {
        try {
            const originname = window.location.origin;
            await navigator.clipboard.writeText(originname + '/' + username);
            dispatch(setMessage('copied To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        } catch (err) {
            dispatch(setMessage('could not copy To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        }
    };

    return <>
        <div className={`fixed top-4 left-4 right-4 flex flex-row justify-between items-center rounded-full text-black backdrop-blur-sm bg-white/60 drop-shadow-lg ${isSticky ? '' : 'place-self-end'}`}>
            {isSticky &&
                <>
                    <div className={`w-10 h-10 m-1 ${s.profile_picture}`}>
                        <img loading="lazy" alt='user profile' src={urlsinfo?.picture?.url ? urlsinfo?.picture?.url : avatar} className='rounded-full object-cover w-full h-full' />
                    </div>
                    <p className='text-2xl font-light'>{urlsinfo?.username}</p>
                </>
            }
            <div onClick={() => setMenu(!menu)} className='bg-gray-200 text-black rounded-full w-10 h-10 m-1 grid place-content-center cursor-pointer'><FontAwesomeIcon icon="fas fa-ellipsis" /></div>
        </div>

        {
            <Transition in={menu} timeout={100}>
                {(state) => (
                    <div className={`fixed sm:top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-y-0 ' : 'translate-y-full '}`}>
                        <div className='bg-white text-black shadow-lg max-w-2xl w-full sm:w-auto rounded-t-lg sm:rounded-xl p-4 flex flex-col gap-4'>
                            <div className='w-full flex flex-row justify-between items-center'>
                                <p className='text-md font-bold'>Welcome to my Uniurl</p>
                                <div onClick={() => setMenu(false)} className='hover:bg-slate-200 p-2 grid place-content-center cursor-pointer'>
                                    <FontAwesomeIcon className='text-2xl ' icon='fas fa-xmark' />
                                </div>
                            </div>
                            <button onClick={() => copyToClipboard(urlsinfo?.username)} className='relative'>
                                <input
                                    type="text"
                                    name="name"
                                    value={urlsinfo?.username}
                                    maxLength="30"
                                    placeholder="Alexa"
                                    className='bg-transparent w-full py-1 px-2 text-xl border border-1 rounded-md border-black'
                                    disabled
                                />
                                <FontAwesomeIcon icon='fas fa-copy' className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-black' />
                            </button>
                            <div className='h-[1px] bg-slate-600 w-full'></div>
                            <p className='text-xl font-bold'>Create your own Uniurl</p>
                            <div className='w-full flex justify-between gap-5 md:gap-2'>
                                <Link to='/user/register' className='w-full bg-black text-white py-1 px-2 text-center rounded-full border-[1px] border-black hover:bg-white hover:text-black hover:border-black text-nowrap'>Sign up free</Link>
                                <Link to='/' className='w-full bg-white text-black py-1 px-2 text-center rounded-full border-[1px] border-slate-300 hover:bg-white hover:text-black hover:border-black text-nowrap'>Find out more</Link>
                            </div>
                        </div>
                    </div>
                )}
            </Transition >
        }
    </>
}

export default StickyNav;