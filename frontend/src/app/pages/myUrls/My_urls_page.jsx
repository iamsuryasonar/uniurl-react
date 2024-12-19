import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_my_urls, delete_my_url } from '../../store/slices/myUrlSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function MyUrlCard({ urlData, onClick, onDelete }) {
    const { _id, title, url } = urlData;

    return (
        <a href={url} target='_blank' rel='noopener' className={`bg-[#171717] text-white group hover:bg-slate-200 hover:text-black w-full px-4 py-2 rounded-lg flex flex-row justify-between items-center cursor-pointer`} tabIndex={0} aria-label={`${title} url`}>
            {urlData?.icon && <FontAwesomeIcon style={{ color: urlData?.color }} className='w-6 h-6 p-2 rounded-full aspect-square text-2xl border-[1px] border-white group-hover:border-black' icon={urlData?.icon} />}
            <p className='flex items-center gap-2 text-xl px-2 text-center'>
                {title}
            </p>
            <button onClick={(e) => {
                e.preventDefault()
                onDelete(e, _id)
                e.stopPropagation();
            }}
                onKeyDown={(e) => {
                    e.preventDefault()
                    if (e.key === 'Enter') {
                        onDelete(e, _id);
                    }
                    e.stopPropagation();
                }} >
                <FontAwesomeIcon aria-label="Delete" tabIndex={0} icon={faTrash} className='p-4 hover:bg-black hover:text-red-500 rounded-full' />
            </button>
        </a>
    )
}


function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);

    useEffect(() => {
        dispatch(get_my_urls());
    }, [dispatch]);

    const onDeleteHandler = (e, id) => {
        e.stopPropagation();
        dispatch(delete_my_url(id))
    }

    const onCardClicked = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className='w-full max-w-2xl m-auto  flex flex-col items-center gap-4 py-14'>
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