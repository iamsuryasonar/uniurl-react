import { useEffect, useState } from 'react';
import s from './Url_page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_urls } from '../../store/slices/urlSlice';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message/Message'
import avatar from '../../assets/avatar.jpg'

function UrlCard({ urlData, onClick }) {

    const { _id, title, url } = urlData;

    return (
        <div className={s.url_card} onClick={() => onClick(url)}>
            <div className={s.title}>
                {title}
            </div>

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

    const { message } = useSelector((state) => state.message);
    const urlsinfo = useSelector((state) => state.urlsinfo.urlsinfo);

    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }

    return (
        <>
            {/* {message && <Message label={message} />} */}
            {urlsinfo ?
                <div className={s.wrapper}>
                    <div className={s.profile_box}>
                        <div className={s.container}>
                            <div className={s.outer_ring}>
                                <div className={s.img_wrap}>
                                    <img src={urlsinfo?.picture ? urlsinfo?.picture : avatar} className={s.img} />
                                </div>
                            </div>
                            <div className={s.name_bio_status}>
                                <p className={s.name}>{urlsinfo?.name}</p>
                                {/* <p className={s.status}>{urlsinfo?.status}</p> */}
                                <p className={s.bio}>{urlsinfo?.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.url_box}>
                        {
                            urlsinfo?.links ? Object.values(urlsinfo?.links).map((item) => {
                                return (
                                    <UrlCard urlData={item} onClick={onCardClicked} key={item['_id']} />
                                )
                            }) : null
                        }
                    </div>
                </div>
                :
                <></>
            }

        </>
    );
}

export default UrlsPage;