import { useEffect } from 'react';
import s from './My_urls_page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_my_urls, delete_my_url } from '../../store/slices/myUrlSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function MyUrlCard({ urlData, onClick, onDelete }) {
    const { _id, title, url } = urlData;

    return (
        <div className={s.url_card} onClick={() => onClick(url)}>
            <div className={s.title}>
                {title}
            </div>
            <div className={s.delete_button} onClick={(e) => onDelete(e, _id)}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    )
}


function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_my_urls());
    }, []);

    const onDeleteHandler = (e, id) => {
        e.stopPropagation();
        dispatch(delete_my_url(id))
    }

    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className={s.wrapper}>
            {
                urls && urls?.length === 0 &&
                <div className={s.no_url_card}>
                    <p>You don't have urls to share...</p>
                    <Link to='/user/create_url' className={s.add_url_button}>Add Url</Link>
                </div>
            }
            {
                urls && (urls).map((url) => {
                    return (
                        <MyUrlCard urlData={url} onClick={onCardClicked} onDelete={onDeleteHandler} key={url._id} />
                    )
                })
            }
        </div>
    );
}



export default MyUrlPage;