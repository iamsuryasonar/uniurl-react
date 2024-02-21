import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { clearMessage } from '../../store/slices/messageSlice';
import { get_urls } from '../../store/slices/urlSlice';
import avatar from '../../assets/avatar.jpg'

function UrlCard({ urlData, onClick, theme }) {
    const { title, url } = urlData;

    return (
        <div className={`${theme?.urlcardcontainer} `} style={{ color: urlData?.color }} onClick={() => onClick(url)}>
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

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_urls(username));
    }, []);

    const urlsinfo = useSelector((state) => state.urlsinfo.urlsinfo);
    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className={`${urlsinfo?.theme?.pagecontainer}`}>
            {urlsinfo ?
                <div className='w-full'>
                    <div className={`${urlsinfo?.theme?.avatarnameciocontainer}`}>
                        <div className={`${urlsinfo?.theme?.avatarimagecontainer} `}>
                            <img src={urlsinfo?.picture?.url ? urlsinfo?.picture?.url : avatar} className='object-fit' />
                        </div>
                        <div className={`${urlsinfo?.theme?.namebiocontainer} `}>
                            <p className='text-2xl'>{urlsinfo?.name}</p>
                            <p className='text-lg'>{urlsinfo?.bio}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
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
        </div >
    );
}

export default UrlsPage;