import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Reorder } from "framer-motion";
import { get_my_urls, delete_my_url, reorder_urls, myUrlsState } from '../../store/slices/myUrlSlice';
import MyUrlCard from './components/MyUrlCard';

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector(myUrlsState);
    const [reorderedUrls, setReorderedUrls] = useState(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        dispatch(get_my_urls());
    }, [dispatch]);

    useEffect(() => {
        if (urls && reorderedUrls) {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                // check if order of urls has changed
                for (let i = 0; i < urls.length; i++) {
                    if (urls[i]._id !== reorderedUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedUrls }));
                        break;
                    }
                }
            }, 500);
        }
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    }, [reorderedUrls, urls, dispatch])
    useEffect(() => {
        setReorderedUrls(urls);
    }, [urls])

    const onDeleteHandler = (e, id) => {
        e.stopPropagation();
        dispatch(delete_my_url(id))
    }

    return (
        <>
            <div className='relative w-full max-w-2xl m-auto py-14'>
                {
                    urls && urls?.length === 0 &&
                    <div className='w-10/12 flex flex-col items-center gap-4'>
                        <p>You don't have urls to share...</p>
                        <Link to='/user/create_url' className='w-full rounded-full border border-1 border-white cursor-pointer bg-black text-white flex justify-center items-center px-2 py-1'>Add Url</Link>
                    </div>
                }
                {
                    reorderedUrls && <Reorder.Group axis="y" onReorder={setReorderedUrls} values={reorderedUrls} className='w-full'>
                        {
                            reorderedUrls.map((url) => {
                                return (
                                    <MyUrlCard urlData={url} onDelete={onDeleteHandler} key={url._id} />
                                )
                            })
                        }
                    </Reorder.Group>
                }
            </div>
        </>
    );
}



export default MyUrlPage;