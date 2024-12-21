import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_my_urls, delete_my_url, myUrlsState } from '../../store/slices/myUrlSlice';
import { Link } from "react-router-dom";
import MyUrlCard from './components/MyUrlCard';

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector(myUrlsState);

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