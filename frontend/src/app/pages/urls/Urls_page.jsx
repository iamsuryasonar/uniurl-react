
import React, { useEffect, useState } from 'react';
import s from './Url_page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_urls } from '../../store/slices/urlSlice';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message/Message'

function UrlsPage() {
    const { username } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_urls(username));
    }, []);

    const { message } = useSelector((state) => state.message);
    const urls = useSelector((state) => state.urls.urls);
    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }
    return (
        <div className={s.wrapper}>
            {message && <Message label={message} />}
           
            {
                urls ? Object.values(urls).map((url) => {
                    return (
                        <div className={s.url_box} key={url._id} onClick={() => onCardClicked(url.url)}>
                            <div className={s.title}>
                                {url.title}
                            </div>
                            <div className={s.description}>
                                {url.description}
                            </div>
                        </div>
                    )
                }) : null
            }
        </div>
    );
}

export default UrlsPage;