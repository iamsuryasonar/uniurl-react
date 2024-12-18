import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clearMessage, setMessage } from '../../store/slices/messageSlice';
import { get_urls } from '../../store/slices/urlSlice';
import avatar from '../../assets/avatar.jpg'
import { Transition } from 'react-transition-group';
import s from './urls.module.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function UrlCard({ urlData, onClick, theme }) {
    const { title, url, color } = urlData;

    return (
        <div style={theme?.cardContainer} className={`w-full flex justify-between items-center gap-2 text-xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out`} onClick={() => onClick(url)}>
            {urlData?.icon && <FontAwesomeIcon className='w-8 h-8 aspect-square' style={{ ...theme?.cardIcon, ...{ color: theme?.cardIcon?.color ? theme?.cardIcon?.color : color } }} icon={urlData?.icon} />}
            <p className='text-center px-2'>{title}</p>
            <FontAwesomeIcon style={theme?.cardArrowIcon} icon={faArrowRight} className='w-5 h-5' />
            {(theme?.cardArrowIcon?.display === 'none') ? <div></div> : <></>}
        </div>
    )
}



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
        <div className={`sticky top-4 left-4 right-4 flex flex-row justify-between items-center rounded-full text-black backdrop-blur-sm bg-white/60 drop-shadow-lg ${isSticky ? '' : 'place-self-end'}`}>
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
        {<Transition in={menu} timeout={100}>
            {(state) => (
                <div className={`fixed sm:top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-y-0 ' : 'translate-y-full '}`}>
                    <div className='bg-white text-black shadow-lg max-w-2xl w-full sm:w-auto rounded-t-lg sm:rounded-xl p-4 flex flex-col gap-4'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <p className='text-md font-bold'>Welcome to my Uniurl</p>
                            <div onClick={() => setMenu(false)} className='hover:bg-slate-200 p-2 grid place-content-center cursor-pointer'>
                                <FontAwesomeIcon className='text-2xl ' icon='fas fa-xmark' />
                            </div>
                        </div>
                        <div onClick={() => copyToClipboard(urlsinfo?.username)} className='relative'>
                            <input
                                type="text"
                                name="name"
                                value={urlsinfo?.username}
                                maxLength="30"
                                placeholder="Alexa"
                                className='bg-transparent w-full py-1 px-2 text-xl border border-1 rounded-md border-black'
                                readOnly
                            />
                            <FontAwesomeIcon icon='fas fa-copy' className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-black' />
                        </div>
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



function UrlsPage() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const elementRef = useRef(null);
    const { loading } = useSelector((state) => state.loading);

    useEffect(() => {
        dispatch(get_urls(username));
    }, [username, dispatch]);

    const urlsinfo = useSelector((state) => state.urlsinfo.urlsinfo);

    const onCardClicked = (url) => {
        window.open(url, '_blank', 'noreferrer');
    }

    if (urlsinfo?.length === 0) return (
        <div className={`bg-[#e3f5f4] text-[#333] `}>
            <div className='w-full min-h-svh max-w-lg m-auto flex flex-col items-center justify-center p-4 gap-4 '>
                <div className='border-[1px] border-slate-500 rounded-lg p-4 flex flex-col gap-4'>
                    <p className='font-bold text-xl sm:text-2xl text-center'>User does not exist</p>
                    <Link to={-1} className='px-3 py-2 rounded-full text-center border-[1px] border-slate-500 text-black hover:bg-black hover:text-white'>go back</Link>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {
                loading &&
                <div className={s.line_container}>
                    <div className={s.moving_gradient}></div>
                </div>
            }
            <div style={urlsinfo?.theme.page_container}>
                <div className={`min-h-svh max-w-lg m-auto flex flex-col p-4 gap-4`}>
                    {urlsinfo ?
                        <div className='w-full relative flex flex-col justify-center'>
                            <StickyNav elementRef={elementRef} urlsinfo={urlsinfo} />
                            <div className={`flex items-center flex-col gap-4 py-10`}>
                                <div style={urlsinfo?.theme.profile_picture_wrapper} className={`w-28 h-28 aspect-square rounded-full overflow-hidden `}>
                                    <img alt='user profile' src={urlsinfo?.picture?.url ? urlsinfo?.picture?.url : avatar} className='w-full h-full rounded-full  object-cover' />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p ref={elementRef} className='text-2xl p-2 font-bold'>{urlsinfo?.username}</p>
                                    {urlsinfo?.location && <p className='text-lg font-thin'> <FontAwesomeIcon icon='fas fa-location-dot' /> {urlsinfo?.location}</p>}
                                    <p className='text-md text-wrap text-center'>
                                        {urlsinfo?.bio}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-4 pb-10'>
                                {
                                    urlsinfo && urlsinfo?.links.length > 0 ? urlsinfo?.links.map((item) => {
                                        return (
                                            <UrlCard urlData={item} onClick={onCardClicked} key={item['_id']} theme={urlsinfo?.theme} />
                                        )
                                    }) : <p className='text-slate-500'> {'Urls not yet added by ' + urlsinfo?.username}</p>
                                }
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    );
}

export default UrlsPage;
