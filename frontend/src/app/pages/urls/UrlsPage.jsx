import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get_urls, urlsState } from '../../store/slices/urlSlice';
import avatar from '../../assets/avatar.jpg';
import s from './urls.module.css';
import Message from '../../components/message/Message';
import UrlCard from './components/UrlCard';
import GetStartedModal from './components/GetStartedModal';
import { loadingState } from '../../store/slices/loadingSlice';
import { messageState } from '../../store/slices/messageSlice';

function UrlsPage() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const elementRef = useRef(null);
    const { loading } = useSelector(loadingState);
    const { message } = useSelector(messageState);

    useEffect(() => {
        dispatch(get_urls(username));
    }, [username, dispatch]);

    const urlsinfo = useSelector(urlsState);

    const onCardClicked = (url) => {
        window.open(url, '_blank', 'noreferrer');
    }

    if (loading) {
        return <>
            <div className={s.line_container}>
                <div className={s.moving_gradient}></div>
            </div>
            <div className='w-full h-svh bg-slate-900'></div>
        </>
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
            <div style={urlsinfo?.theme.page_container}>
                <div className={`min-h-screen max-w-lg m-auto flex flex-col p-4 gap-4`}>
                    {urlsinfo ?
                        <div className='w-full relative flex flex-col justify-center'>
                            <GetStartedModal elementRef={elementRef} urlsinfo={urlsinfo} />
                            <div className={`flex items-center flex-col gap-4 py-10 pb-6`}>
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
                            <div className='flex items-center justify-center gap-4 pb-10 flex-wrap'>
                                {
                                    urlsinfo && urlsinfo?.socialLinks.length > 0 ? urlsinfo?.socialLinks.map((url) => {
                                        return (
                                            <a key={url._id} href={url.url} target='_blank' rel='noopener' style={urlsinfo?.theme.socialIcon} className='p-2 aspect-square rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out' >
                                                {url?.icon && <FontAwesomeIcon className='w-7 h-7' style={{ ...urlsinfo?.theme?.cardIcon, ...{ color: urlsinfo?.theme?.cardIcon?.color ? urlsinfo?.theme?.cardIcon?.color : url?.color } }} icon={url?.icon} />}
                                            </a>
                                        )
                                    }) : <></>
                                }
                            </div>
                            <div className='flex flex-col items-center gap-4 pb-[80px]'>
                                {
                                    urlsinfo && urlsinfo?.links.length > 0 ? urlsinfo?.links.map((item) => {
                                        return (
                                            <UrlCard urlData={item} onClick={onCardClicked} key={item['_id']} theme={urlsinfo?.theme} />
                                        )
                                    }) : <p className='text-slate-500'> {'Urls not added by ' + urlsinfo?.username}</p>
                                }
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
                <p className='text-slate-800/50 font-thin text-xs place-self-center'>© 2024 UniURL</p>
            </div>
            <Message message={message} />
        </>
    );
}

export default UrlsPage;
