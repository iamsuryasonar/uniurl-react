import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clearMessage, setMessage } from '../../store/slices/messageSlice';
import { get_urls } from '../../store/slices/urlSlice';
import avatar from '../../assets/avatar.jpg'
import Message from '../../components/Message/Message'
import { Transition } from 'react-transition-group';

function UrlCard({ urlData, onClick, theme }) {
    const { title, url } = urlData;

    return (
        <div style={{ ...theme?.urlcardcontainer, color: urlData?.color }} className={`${!theme ? `w-full bg-black py-2 px-4 flex flex-row justify-between p-4` : ''}`} onClick={() => onClick(url)}>
            <p className={`flex items-center gap-2 text-xl `}>
                {urlData?.icon && <FontAwesomeIcon className='text-2xl hover:scale-150 transition-all duration-300 ease-in-out' icon={urlData?.icon} />}
                {title}
            </p>
            <p>🚀</p>
        </div>
    )
}

function UrlsPage() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const [isSticky, setIsSticky] = useState(false);
    const [menu, setMenu] = useState(false);
    const elementRef = useRef(null);
    const { message } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_urls(username));
    }, []);

    const urlsinfo = useSelector((state) => state.urlsinfo.urlsinfo);
    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }

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

    const copyToClipboard = async (name) => {
        try {
            const originname = window.location.origin;
            await navigator.clipboard.writeText(originname + '/' + name);
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

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menu]);


    return (
        <div style={urlsinfo?.theme?.pagecontainer} className={`${!urlsinfo?.theme ? `max-w-xl min-h-svh bg-slate-100 m-auto flex flex-col p-4 gap-4` : ''}`}>
            {urlsinfo ?
                <div className='w-full relative '>
                    {/* sticky nav */}
                    <div className={`sticky top-4 left-4 right-4 rounded-full text-black ${isSticky ? 'backdrop-blur-sm bg-white/60 flex flex-row justify-between items-center' : 'grid justify-items-end '}`}>
                        {isSticky &&
                            <>
                                <div className={`w-10 h-10 m-1`}>
                                    <img src={urlsinfo?.picture?.url ? urlsinfo?.picture?.url : avatar} className='w-full h-full rounded-full object-fit' />
                                </div>
                                <p className='text-2xl font-light'>{urlsinfo?.name}</p>
                            </>
                        }
                        <div onClick={() => setMenu(!menu)} className='bg-gray-200 text-black rounded-full w-10 h-10 m-1 grid place-content-center'><FontAwesomeIcon icon="fas fa-ellipsis" /></div>
                    </div>
                    {<Transition in={menu} timeout={100}>
                        {(state) => (
                            <div className={`fixed sm:top-0 right-0 bottom-0 left-0  rounded-xl flex justify-center items-center transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-y-0 ' : 'translate-y-full '}`}>
                                <div className='bg-white max-w-xl w-full sm:w-auto  sm:auto sm:m-20  rounded-t-lg sm:rounded-xl  p-6 flex flex-col gap-4'>
                                    <div className='w-full flex flex-row justify-between items-center'>
                                        <p className='text-md font-bold'>Welcome to my Uni Url</p>
                                        <div onClick={() => setMenu(false)} className='hover:bg-slate-200 p-2 grid place-content-center'>
                                            <FontAwesomeIcon className='text-2xl' icon='fas fa-xmark' />
                                        </div>
                                    </div>
                                    <div onClick={() => copyToClipboard(urlsinfo?.name)} className='relative'>
                                        <input
                                            type="text"
                                            name="name"
                                            value={urlsinfo?.name}
                                            maxLength="30"
                                            placeholder="Alexa"
                                            className='w-full py-1 px-2 text-xl border border-1 rounded-md border-black'
                                            readOnly
                                        />
                                        <FontAwesomeIcon icon='fas fa-copy' className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-black' />
                                    </div>
                                    <div className='h-[1px] bg-slate-600 w-full'></div>
                                    <p className='text-xl font-bold'>Create your own Uni Url</p>
                                    <div className='w-full flex justify-between gap-5 md:gap-2'>
                                        <Link to='/user/register' className='w-full bg-black text-white py-1 text-center rounded-full'>Sign up free</Link>
                                        <Link to='/' className='w-full bg-white text-black py-1 text-center border  rounded-full'>Find out more</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Transition >
                    }

                    <div style={urlsinfo?.theme?.avatarnamebiocontainer} className={`${!urlsinfo?.theme ? `flex items-center flex-col gap-4 py-10 ` : ''}`}>
                        <div style={{
                            ...urlsinfo?.theme?.avatarimagecontainer
                        }} className={` ${!urlsinfo?.theme ? `w-28 h-28 aspect-square rounded-full ` : ''}`}>
                            <img src={urlsinfo?.picture?.url ? urlsinfo?.picture?.url : avatar} className='w-full h-full object-fit' />
                        </div>
                        <div style={urlsinfo?.theme?.namebiocontainer}>
                            <p ref={elementRef} className='text-2xl'>{urlsinfo?.name}</p>
                            <p className='text-lg'>{urlsinfo?.bio}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4 pb-10'>
                        {
                            urlsinfo && urlsinfo?.links.length > 0 ? urlsinfo?.links.map((item) => {
                                return (
                                    <UrlCard theme={urlsinfo?.theme} urlData={item} onClick={onCardClicked} key={item['_id']} />
                                )
                            }) : <p className='text-slate-500'> {'Urls not yet added by ' + urlsinfo?.name} 😭</p>
                        }
                    </div>
                </div>
                :
                <></>
            }
            {
                message &&
                <Message message={message} />
            }
        </div >
    );
}

export default UrlsPage;