import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Reorder } from "framer-motion";
import { get_my_urls, delete_my_url, reorder_urls, create_my_urls } from '../../store/slices/myUrlSlice';
import { profileState } from '../../store/slices/profileSlice';
import MyUrlCard from './components/MyUrlCard';
import UrlForm from './components/UrlForm';
import MySocialUrlCard from './components/MySocialUrlCard';

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);
    const profileInfo = useSelector(profileState);
    const [reorderedUrls, setReorderedUrls] = useState(null);
    const [reorderedSocialUrls, setReorderedSocialUrls] = useState(null);
    const debounceTimeout = useRef(null);
    const [showAddUrlMenu, setShowAddUrlMenu] = useState(false);

    useEffect(() => {
        dispatch(get_my_urls());
    }, []);

    useEffect(() => {
        if (urls && reorderedUrls && reorderedSocialUrls) {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                // check if order of urls has changed
                for (let i = 0; i < urls?.links.length; i++) {
                    if (urls?.links[i]._id !== reorderedUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedUrls }));
                        break;
                    }
                }
                for (let i = 0; i < urls?.socialLinks.length; i++) {
                    if (urls?.socialLinks[i]._id !== reorderedSocialUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedSocialUrls }));
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
    }, [reorderedUrls, reorderedSocialUrls, urls, dispatch])

    useEffect(() => {
        setReorderedUrls(urls?.links);
        setReorderedSocialUrls(urls?.socialLinks);
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
            <div className='relative w-full max-w-2xl m-auto py-14 flex flex-col gap-2'>
                {
                    urls && urls?.length === 0 &&
                    <div className='w-10/12 text-black p-4'>
                        <p className='text-2xl font-bold'>You don't have urls to share...</p>
                    </div>
                }
                {
                    urls && reorderedUrls && <div className='w-full p-2 flex place-content-end gap-3 border-[1px] border-slate-200 rounded-lg'>
                        <button onClick={() => setShowAddUrlMenu(true)} className='bg-white text-slate-600 px-5 py-1 rounded-lg text-center font-semibold hover:text-black hover:bg-transparent border-[1px] border-slate-300 hover:border-black shadow-md'>Add</button>
                        {(urls.links?.length > 0 || urls.socialLinks?.length > 0) && <button onClick={onPreview} className='bg-slate-100 text-slate-600 px-5 py-1 rounded-lg text-center font-semibold hover:text-white hover:bg-black border-[1px] border-transparent hover:border-white shadow-md'>Preview</button>}
                    </div>
                }
                {
                    reorderedSocialUrls?.length > 0 && <>
                        <p className='text-black font-bold text-xl'>Social links</p>
                        {
                            <Reorder.Group className='w-full p-2 border-[1px] border-slate-200 rounded-lg' axis="y" onReorder={setReorderedSocialUrls} values={reorderedSocialUrls} >
                                {
                                    reorderedSocialUrls.map((url) => {
                                        return (
                                            <MyUrlCard key={url._id} urlData={url} onDelete={onDeleteHandler} />
                                        )
                                    })
                                }
                            </Reorder.Group>
                        }
                    </>
                }
                {
                    reorderedUrls?.length > 0 && <>
                        <p className='text-black font-bold text-xl'>Other links</p>
                        {
                            <Reorder.Group className='w-full p-2 border-[1px] border-slate-200 rounded-lg' axis="y" onReorder={setReorderedUrls} values={reorderedUrls} >
                                {
                                    reorderedUrls.map((url) => {
                                        return (
                                            <MyUrlCard key={url._id} urlData={url} onDelete={onDeleteHandler} />
                                        )
                                    })
                                }
                            </Reorder.Group>
                        }
                    </>
                }
                {
                    showAddUrlMenu && <UrlForm type={'ADD'} urlData={null} setShowMenu={setShowAddUrlMenu} onSubmit={create_my_urls} />
                }
            </div>
        </>
    );
}



export default MyUrlPage;