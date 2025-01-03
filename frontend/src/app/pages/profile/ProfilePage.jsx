import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPen, faShare } from '@fortawesome/free-solid-svg-icons'
import { Transition } from 'react-transition-group';
import avatar from '../../assets/avatar.jpg';
import ThemeServices from '../../services/theme.services';
import ProfileService from '../../services/profile.services';
import { upload_profile_picture, get_profile_info, update_profile_info, profileState } from '../../store/slices/profileSlice'
import { closeMenu } from '../../store/slices/menuSlice';
import { logout } from '../../store/slices/authSlice';
import SocialShareCard from '../../components/SocialShareCard'

const ProfilePage = () => {

    const dispatch = useDispatch();
    const profileInfo = useSelector(profileState);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(profileInfo?.picture || avatar);
    const [themes, setThemes] = useState(null);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const [input, setInput] = useState({
        'username': '',
        'bio': '',
        'theme': '',
        'location': '',
    });

    const getAllTheme = async () => {
        const results = await ThemeServices.getTheme()
        setThemes(results?.data)
    }

    useEffect(() => {
        getAllTheme();
    }, [])

    useEffect(() => {
        if (!profileInfo) {
            dispatch(get_profile_info())
        }
    }, [profileInfo, dispatch]);

    useEffect(() => {
        if (profileInfo?.picture) {
            setImagePreviewUrl(profileInfo.picture.url);
        }
        if (profileInfo?.bio) {
            setInput(prev => (
                {
                    ...prev,
                    'bio': profileInfo?.bio,
                    'location': profileInfo?.location,
                    'theme': profileInfo?.theme?._id,
                }
            ))

        }
        if (profileInfo?.username) {
            setInput(prev => (
                {
                    ...prev,
                    ['username']: profileInfo.username,
                }
            ))
        }

    }, [profileInfo]);

    const photoUpload = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        dispatch(upload_profile_picture(file));
        if (file) {
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onChangeHandler = async (e) => {
        setInput(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value,
            }
        ))

        if (e.target.name === 'username' && profileInfo?.usernameUpdated === false && profileInfo?.username !== e.target.value) {
            const res = await ProfileService.isUsernameExists(e.target.value);
            setUsernameAvailable(!res?.data?.isExist);
        } else {
            setUsernameAvailable(null);
        }
    }

    const submitHandler = () => {
        dispatch(update_profile_info(input));
        setUsernameAvailable(null);
    }

    const handleLogOut = () => {
        dispatch(closeMenu())
        dispatch(logout())
    }

    return (
        <>
            <div className="w-full flex justify-center items-center m-auto">
                <div className='h-full max-w-[400px] py-14 text-white'>
                    <div className='px-6 py-10 rounded-2xl flex flex-col justify-center items-center gap-4 gradient_box relative'>
                        <button
                            className='absolute top-2 right-2 w-[40px] aspect-square rounded-full text-white border-[1px] border-slate-500 hover:bg-white hover:text-black'
                            onClick={() => setShowShareMenu(true)}>
                            <FontAwesomeIcon icon={faShare} className='cursor-pointer' />
                        </button>
                        <label htmlFor="photo-upload" className={`border border-1 border-white rounded-full inline-block relative p-1 cursor-pointer text-black `}>
                            <div className={`group relative w-36 h-36 overflow-hidden rounded-full`}>
                                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl w-36 h-36 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out bg-black flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faPen} />
                                </div>
                                <img htmlFor="photo-upload" src={imagePreviewUrl} alt='user profile placeholder' className='object-cover w-full h-full' />
                            </div>
                            <input id='photo-upload' type="file" name='file' onChange={photoUpload} accept="image/*" className='hidden' />
                        </label>
                        <div className='w-full flex flex-col'>
                            <label className='' htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={input?.username}
                                onChange={onChangeHandler}
                                maxLength="30"
                                placeholder="eg. alexa"
                                required
                                className='w-full rounded-full border border-1 border-white px-3 py-2 bg-transparent text-white'
                                disabled={profileInfo?.usernameUpdated}
                            />
                            <div className='h-[10px]'>
                                {
                                    usernameAvailable !== null && <>
                                        {usernameAvailable ?
                                            <p className='pl-3 text-sm text-green-500'>Username available</p>
                                            :
                                            <p className='pl-3 text-sm text-red-500'>Username not available</p>}
                                    </>
                                }
                            </div>

                        </div>
                        <div className='w-full flex flex-col'>
                            <label className='' htmlFor="location">Location:</label>
                            <input
                                type="text"
                                name="location"
                                onChange={onChangeHandler}
                                value={input?.location}
                                placeholder="Add location"
                                required
                                className='w-full rounded-full border border-1 border-white px-3 py-2 bg-transparent text-white'
                            />
                        </div>

                        <div className='w-full flex flex-col'>
                            <label className='' htmlFor="bio">Bio:</label>
                            <textarea
                                cols="40"
                                rows="5"
                                name="bio"
                                onChange={onChangeHandler}
                                value={input?.bio}
                                placeholder="Write something!"
                                required
                                className='w-full rounded-xl border border-1 border-white px-3 py-2 bg-[#040C18] text-white'></textarea>
                        </div>
                        <div className='w-full flex flex-col'>
                            <label className='' htmlFor="bio">Url page theme:</label>
                            <select onChange={onChangeHandler} value={input?.theme} name='theme' className='w-full rounded-full border border-1 border-white px-3 py-2 bg-[#040C18] text-white'>
                                <option value='' disabled className=''>select theme...</option>
                                {
                                    themes?.map((item) => {
                                        return <option key={item._id} value={item._id} className={`${profileInfo?.theme === item?.name ? 'bg-white text-black' : ''}`}> {item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button onClick={submitHandler} className='animate w-full py-1 font-bold text-lg border-[1px] border-white rounded-full bg-white text-black hover:bg-black hover:text-white'> Save</button>
                        <button
                            className={`w-full rounded-full py-1 px-4 font-bold border-[1px] cursor-pointer text-center hover:bg-[#FF4820] border-[#FF4820]`}
                            aria-label='log out'
                            onClick={() => setShowLogoutDialog(true)}
                        >Log out</button>
                    </div>
                </div >
            </div>
            {
                showLogoutDialog && <div className='z-40 fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center'>
                    <div className='w-[350px] m-6 p-4 text-white flex flex-col justify-center items-center gap-4 border-[1px] border-slate-600 rounded-lg'>
                        <p className='text-xl font-bold'>Are you sure you want to log out?</p>
                        <div className='w-full flex justify-between gap-2'>
                            <button
                                className='px-4 py-1 hover:bg-red-500 border-[1px] border-white rounded-lg'
                                aria-label='confirm log out'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogOut()
                                    }
                                }}
                                onClick={handleLogOut}
                            >Log out</button>
                            <button
                                className='px-4 py-1 hover:bg-green-500 border-[1px] border-white rounded-lg'
                                aria-label='cancel log out'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setShowLogoutDialog(false)
                                    }
                                }}
                                onClick={() => setShowLogoutDialog(false)}
                            >Cancel</button>
                        </div>
                    </div >
                </div>
            }
            {
                <Transition in={showShareMenu} timeout={100}>
                    {(state) => (
                        <div className={`fixed sm:top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-y-0 ' : 'translate-y-full '}`}>
                            <div className='bg-white text-black shadow-lg max-w-2xl w-full min-w-[350px] sm:w-auto rounded-t-lg sm:rounded-xl px-6 py-8 flex flex-col gap-4'>
                                <div className='w-full flex flex-row justify-between items-center'>
                                    <p className='text-md font-bold'>Share</p>
                                    <div onClick={() => setShowShareMenu(false)} className='bg-slate-200 hover:bg-black hover:text-white w-[40px] aspect-square grid place-content-center cursor-pointer rounded-full'>
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                </div>
                                <SocialShareCard username={profileInfo?.username || ''} />
                            </div>
                        </div>
                    )}
                </Transition >
            }
        </>
    );
}

export default ProfilePage;