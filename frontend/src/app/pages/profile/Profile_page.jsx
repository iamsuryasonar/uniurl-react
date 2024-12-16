import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upload_profile_picture, get_profile_info, update_bio_or_status } from './../../store/slices/profileSlice'
import { clearMessage, setMessage } from '../../store/slices/messageSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../assets/avatar.jpg';
import ThemeServices from '../../services/theme.services';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const profileInfo = useSelector(state => state.profile.profileInfo);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar);
    const [username, setUsername] = useState('');
    const [themes, setThemes] = useState(null);
    const [input, setInput] = useState({
        'bio': '',
        'theme': '',
        'location': ''
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
            setUsername(profileInfo.username);
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

    const onChangeHandler = (e) => {
        setInput(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const onFocusRemoved = () => {
        dispatch(update_bio_or_status(input))
    }

    const originname = window.location.origin;
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(originname + '/' + username);
            dispatch(setMessage('copied To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        } catch (err) {
            dispatch(setMessage('could not copy To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        }
    };

    const gotoUrlsPage = () => {
        window.open(originname + '/' + username, '_blank');
    }

    return (
        <div className="w-full flex justify-center items-center m-auto ">
            <div className='h-full max-w-[350px] py-14 text-white'>
                <div className='p-6 rounded-2xl flex flex-col justify-center items-center gap-4 gradient_box relative'>
                    <div className='absolute top-2 right-2 p-2 rounded-full text-white hover:bg-black hover:text-white' onClick={gotoUrlsPage}>
                        <FontAwesomeIcon icon='fas fa-link' className=' text-2xl cursor-pointer ' />
                    </div>
                    <label htmlFor="photo-upload" className={`border border-1 border-white rounded-full inline-block relative p-1 cursor-pointer text-black `}>
                        <div className={`group relative w-36 h-36 overflow-hidden rounded-full`}>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl w-36 h-36 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out bg-black flex justify-center items-center'><p>+</p></div>
                            <img htmlFor="photo-upload" src={imagePreviewUrl} alt='user profile placeholder' className='object-cover w-full h-full' />
                        </div>
                        <input id='photo-upload' type="file" name='file' onChange={photoUpload} accept="image/*" className='hidden' />
                    </label>
                    <div className='w-full flex flex-col' onClick={copyToClipboard}>
                        <label className='' htmlFor="name">Username:</label>
                        <div className='relative'>
                            <input
                                type="text"
                                name="name"
                                value={username}
                                maxLength="30"
                                placeholder="Alexa"
                                required
                                className='w-full rounded-full border border-1 border-white px-3 py-2 bg-transparent text-white'
                                readOnly
                            />
                            <FontAwesomeIcon icon={faCopy} className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-white' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col'>
                        <label className='' htmlFor="location">Location:</label>
                        <input
                            type="text"
                            name="location"
                            onChange={onChangeHandler}
                            onBlur={onFocusRemoved}
                            value={input?.location}
                            placeholder="Add location"
                            required
                            className='w-full rounded-xl border border-1 border-white px-3 py-2 bg-transparent text-white'
                        />
                    </div>

                    <div className='w-full flex flex-col'>
                        <label className='' htmlFor="bio">Bio:</label>
                        <textarea
                            cols="40"
                            rows="5"
                            name="bio"
                            onChange={onChangeHandler}
                            onBlur={onFocusRemoved}
                            value={input?.bio}
                            placeholder="Write something!"
                            required
                            className='w-full rounded-xl border border-1 border-white px-3 py-2 bg-[#040C18] text-white'></textarea>
                    </div>
                    <div className='w-full flex flex-col'>
                        <label className='' htmlFor="bio">Url page theme:</label>
                        <select onChange={onChangeHandler} onBlur={onFocusRemoved} value={input?.theme} name='theme' className='w-full rounded-full border border-1 border-white px-3 py-2 bg-[#040C18] text-white'>
                            <option value='' disabled className=''>select theme...</option>
                            {
                                themes?.map((item) => {
                                    return <option key={item._id} value={item._id} className={`${profileInfo?.theme === item?.name ? 'bg-white text-black' : ''}`}> {item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default ProfilePage;