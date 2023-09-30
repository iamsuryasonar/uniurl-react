import  { useEffect } from 'react';
import s from './My_urls_page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_my_urls, delete_my_url } from '../../store/slices/myUrlSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Message from '../../components/Message/Message'

function MyUrlCard({ urlData, onClick, onDelete }) {
    const { _id, title, description, url } = urlData;

    return (
        <div className={s.url_card} onClick={() => onClick(url)}>
            <div className={s.title}>
                {title}
            </div>
            {/* <div className={s.description}>
                {description}
            </div> */}
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
                        <MyUrlCard urlData={url} onClick={onCardClicked} onDelete={onDeleteHandler} key={url._id} />
                    )
                }) : null
            }
        </div>
    );
}



export default MyUrlPage;