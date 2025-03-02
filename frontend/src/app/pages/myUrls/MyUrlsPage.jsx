import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Reorder } from "framer-motion";
import { get_my_urls, delete_my_url, reorder_urls, create_my_urls } from '../../store/slices/myUrlSlice';
import { get_gallery_images, delete_image } from '../../store/slices/galleryImageSlice';
import { profileState } from '../../store/slices/profileSlice';
import MyUrlCard from './components/MyUrlCard';
import UrlForm from './components/UrlForm';
import ImageForm from './components/ImageForm';
import Image from '../../components/Image';

function MyUrlPage() {
    const dispatch = useDispatch();
    const urls = useSelector((state) => state.myurl.urls);
    const galleryImages = useSelector((state) => state.gallery.galleryImages);
    const profileInfo = useSelector(profileState);
    const [reorderedIconUrls, setReorderedIconUrls] = useState(null);
    const [reorderedSocialUrls, setReorderedSocialUrls] = useState(null);
    const [reorderedAffiliateUrls, setReorderedAffiliateUrls] = useState(null);
    const debounceTimeout = useRef(null);
    const [showAddUrlMenu, setShowAddUrlMenu] = useState(false);
    const [showImageMenu, setShowImageMenu] = useState(false);

    useEffect(() => {
        dispatch(get_my_urls());
        dispatch(get_gallery_images());
    }, []);

    useEffect(() => {
        if (urls && reorderedIconUrls && reorderedSocialUrls) {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                // check if order of urls has changed
                for (let i = 0; i < urls?.iconLinks.length; i++) {
                    if (urls?.iconLinks[i]._id !== reorderedIconUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedIconUrls }));
                        break;
                    }
                }
                for (let i = 0; i < urls?.socialLinks.length; i++) {
                    if (urls?.socialLinks[i]._id !== reorderedSocialUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedSocialUrls }));
                        break;
                    }
                }
                for (let i = 0; i < urls?.affiliateLinks.length; i++) {
                    if (urls?.affiliateLinks[i]._id !== reorderedAffiliateUrls[i]._id) {
                        dispatch(reorder_urls({ urls: reorderedAffiliateUrls }));
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
    }, [reorderedIconUrls, reorderedSocialUrls, reorderedAffiliateUrls, urls, dispatch])

    useEffect(() => {
        setReorderedIconUrls(urls?.iconLinks);
        setReorderedSocialUrls(urls?.socialLinks);
        setReorderedAffiliateUrls(urls?.affiliateLinks);
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
                    (reorderedSocialUrls?.length > 0 || reorderedIconUrls?.length > 0 || reorderedAffiliateUrls?.length > 0)
                    && <div className='w-full p-2 flex place-content-end gap-3 border-[1px] border-slate-200 rounded-lg'>
                        <button onClick={() => setShowImageMenu(true)} className='bg-white text-slate-600 px-5 py-1 rounded-lg text-center font-semibold hover:text-black hover:bg-transparent border-[1px] border-slate-300 hover:border-black shadow-md'>Add image</button>
                        <button onClick={() => setShowAddUrlMenu(true)} className='bg-white text-slate-600 px-5 py-1 rounded-lg text-center font-semibold hover:text-black hover:bg-transparent border-[1px] border-slate-300 hover:border-black shadow-md'>Add url</button>
                        {(urls.links?.length > 0 || urls.socialLinks?.length > 0) && <button onClick={onPreview} className='bg-slate-100 text-slate-600 px-5 py-1 rounded-lg text-center font-semibold hover:text-white hover:bg-black border-[1px] border-transparent hover:border-white shadow-md'>Preview</button>}
                    </div>
                }
                {
                    reorderedSocialUrls?.length > 0 && <>
                        <p className='text-black font-bold text-xl'>Social links</p>
                        {
                            <Reorder.Group className='w-full p-4 border-[1px] border-slate-200 rounded-lg space-y-4' axis="y" onReorder={setReorderedSocialUrls} values={reorderedSocialUrls} >
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
                    reorderedIconUrls?.length > 0 && <>
                        <p className='text-black font-bold text-xl'>Links</p>
                        {
                            <Reorder.Group className='w-full p-4 border-[1px] border-slate-200 rounded-lg space-y-4' axis="y" onReorder={setReorderedIconUrls} values={reorderedIconUrls} >
                                {
                                    reorderedIconUrls.map((url) => {
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
                    reorderedAffiliateUrls?.length > 0 && <>
                        <p className='text-black font-bold text-xl'>Affiliate links</p>
                        {
                            <Reorder.Group className='w-full p-4 border-[1px] border-slate-200 rounded-lg space-y-4' axis="y" onReorder={setReorderedAffiliateUrls} values={reorderedAffiliateUrls} >
                                {
                                    reorderedAffiliateUrls.map((url) => {
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
                    galleryImages?.length > 0 &&
                    <>
                        <p className='text-black font-bold text-xl'>Gallery</p>
                        <div className="columns-2 gap-4 w-full p-4 border-[1px] border-slate-200 rounded-lg">
                            {
                                galleryImages.map((image) => {
                                    return <div className='w-full shadow-lg' key={image._id}>
                                        <Image className='object-cover' id={image._id} src={image.picture.url} alt={image.description} deleteImage={delete_image}></Image>
                                    </div>
                                })
                            }
                        </div>
                    </>
                }
                {
                    showAddUrlMenu && <UrlForm type={'ADD'} urlData={null} setShowMenu={setShowAddUrlMenu} onSubmit={create_my_urls} />
                }
                {
                    showImageMenu && <ImageForm setShowMenu={setShowImageMenu} />
                }
            </div>
        </>
    );
}

export default MyUrlPage;
