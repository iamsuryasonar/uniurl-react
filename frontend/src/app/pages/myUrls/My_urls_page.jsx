import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice';
import { get_my_urls, delete_my_url } from '../../store/slices/myUrlSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function MyUrlCard({ urlData, onClick, onDelete }) {
    const { _id, title, url } = urlData;

    return (
        <div className={`bg-black text-white hover:bg-slate-200 hover:text-black w-full px-4 py-2 flex flex-row justify-between  items-center`} tabIndex={0} aria-label='Url'
            onClick={() => onClick(url)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onClick(url)
                }
            }}>
            <p className='flex items-center gap-2 text-xl'>
                {urlData?.icon && <FontAwesomeIcon className='text-2xl hover:scale-150 transition-all duration-300 ease-in-out' icon={urlData?.icon} />}
                {title}
            </p>
            <FontAwesomeIcon aria-label="Delete" tabIndex={0} icon={faTrash} className='p-4 hover:bg-black hover:text-red-500 rounded-full'
                onClick={(e) => onDelete(e, _id)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onDelete(e, _id);
                    }
                }} />
        </div>
    )
}


function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);

    useEffect(() => {
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
        <div className='w-full flex flex-col items-center gap-4 py-10'>
            {
                urls && urls?.length === 0 &&
                <div className='w-10/12 flex flex-col items-center gap-4'>
                    <p>You don't have urls to share...</p>
                    <Link to='/user/create_url' className='w-full rounded-full border border-1 border-white cursor-pointer bg-black text-white flex justify-center items-center px-2 py-1'>Add Url</Link>
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