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
    const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar)
    const [name, setName] = useState('');
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
    }, []);

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
        if (profileInfo?.name) {
            setName(profileInfo.name);
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

    const copyToClipboard = async () => {
        try {
            const originname = window.location.origin;
            await navigator.clipboard.writeText(originname + '/' + name);
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

    return (
        <div className='w-11/12 h-full max-w-[350px] m-auto pt-10'>
            <div className='p-10 rounded-2xl flex flex-col justify-center items-center gap-4 bg-slate-200 '>
                <label htmlFor="photo-upload" className={`border border-1 border-black rounded-full inline-block relative p-1 cursor-pointer text-black `}>
                    <div className={`group relative w-36 h-36 overflow-hidden rounded-full`}>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl w-36 h-36 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out bg-black flex justify-center items-center'><p>+</p></div>
                        <img htmlFor="photo-upload" src={imagePreviewUrl} className='object-cover w-full h-full' />
                    </div>
                    <input id='photo-upload' type="file" name='file' onChange={photoUpload} accept="image/*" className='hidden' />
                </label>
                <div className='w-full flex flex-col' onClick={copyToClipboard}>
                    <label className='' htmlFor="name">Username:</label>
                    <div className='relative'>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            maxLength="30"
                            placeholder="Alexa"
                            required
                            className='w-full rounded-full border border-1 border-black px-3 py-2 bg-transparent text-black'
                            readOnly
                        />
                        <FontAwesomeIcon icon={faCopy} className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-black' />
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
                        className='w-full rounded-xl border border-1 border-black px-3 py-2 bg-transparent text-black'
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
                        className='w-full rounded-xl border border-1 border-black px-3 py-2 bg-transparent text-black'></textarea>
                </div>
                <div className='w-full flex flex-col'>
                    <label className='' htmlFor="bio">Url page theme:</label>
                    <select onChange={onChangeHandler} onBlur={onFocusRemoved} value={input?.theme} name='theme' className='w-full rounded-full border border-1 border-black px-3 py-2 bg-transparent text-black'>
                        <option value='' disabled className=''>select theme...</option>
                        {
                            themes?.map((item) => {
                                return <option key={item._id} value={item._id} className=''> {item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div >
    );
}

export default ProfilePage;