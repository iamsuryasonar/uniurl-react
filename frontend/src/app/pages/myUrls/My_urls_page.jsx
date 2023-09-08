import React, { useEffect, useState } from 'react';
import s from './My_urls_page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_my_urls, delete_my_url } from '../../store/slices/myUrlSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../../components/Message/Message'

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);


    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_my_urls());
    }, []);


    const { message } = useSelector((state) => state.message);

    const onDeleteHandler = (e, id) => {
        e.stopPropagation();
        dispatch(delete_my_url(id))
    }
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
                            <div className={s.delete_button} onClick={(e) => onDeleteHandler(e, url._id)}>
                                <FontAwesomeIcon icon='fa-solid fa-trash' />
                            </div>
                        </div>
                    )
                }) : null
            }
        </div>
    );
}



export default MyUrlPage;