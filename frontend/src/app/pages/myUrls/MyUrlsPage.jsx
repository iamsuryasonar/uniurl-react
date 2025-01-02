import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Reorder } from "framer-motion";
import { get_my_urls, delete_my_url, reorder_urls, create_my_urls } from '../../store/slices/myUrlSlice';
import { profileState } from '../../store/slices/profileSlice';
import MyUrlCard from './components/MyUrlCard';
import UrlForm from './components/UrlForm';

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);
    const profileInfo = useSelector(profileState);
    const [reorderedUrls, setReorderedUrls] = useState(null);
    const debounceTimeout = useRef(null);
    const [showAddUrlMenu, setShowAddUrlMenu] = useState(false);

    useEffect(() => {
        dispatch(get_my_urls());
    }, []);

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

    const onPreview = () => {
        if (!profileInfo?.username) return;

        const originname = window.location.origin;
        window.open(originname + '/' + profileInfo.username, "_blank");
    }

    return (
        <>
            <div className='relative w-full max-w-2xl m-auto py-14'>
                {
                    urls && urls?.length === 0 &&
                    <div className='w-10/12 text-white p-4'>
                        <p className='text-2xl font-bold'>You don't have urls to share...</p>
                    </div>
                }
                {
                    urls && reorderedUrls && <div className='w-full p-2 flex place-content-end gap-3 border-[1px] border-slate-600 rounded-lg'>
                        <button onClick={() => setShowAddUrlMenu(true)} className='bg-white text-black px-5 py-1 rounded-lg text-center font-semibold hover:text-white hover:bg-transparent border-[1px] border-transparent hover:border-white'>Add</button>
                        {urls?.length > 0 && <button onClick={onPreview} className='bg-white text-black px-5 py-1 rounded-lg text-center font-semibold hover:text-white hover:bg-transparent border-[1px] border-transparent hover:border-white'>Preview</button>}
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
                {
                    showAddUrlMenu && <UrlForm type={'ADD'} urlData={null} setShowMenu={setShowAddUrlMenu} onSubmit={create_my_urls} />
                }
            </div>
        </>
    );
}



export default MyUrlPage;