import { useState, useEffect } from 'react';
import s from './Profile_page.module.css'
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
    const [theme, setTheme] = useState('');
    const [themes, setThemes] = useState(null);
    const [input, setInput] = useState({
        'bio': '',
        'theme': '',
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
                    'bio': profileInfo.bio,
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
        <div className={s.wrapper}>
            <div className={s.card}>
                <label htmlFor="photo-upload" className={`${s['custom-file-upload']} ${s.fas} ${s.label}`}>
                    <div className={`${s['img-wrap']}`}>
                        <div className={s.image_overlay}><p>+</p></div>
                        <img htmlFor="photo-upload" src={imagePreviewUrl} className={s.img} />
                    </div>
                    <input id='photo-upload' type="file" name='file' onChange={photoUpload} accept="image/*" className={`${s.inputFile}`} />
                </label>
                <div className={s.field} onClick={copyToClipboard}>
                    <label className={s.status_bio_label} htmlFor="name">Username:</label>
                    <div className={s.input_copy}>
                        <input
                            id={s.name}
                            type="text"
                            name="name"
                            value={name}
                            maxLength="30"
                            placeholder="Alexa"
                            required
                            className={s.inputText}
                            readOnly
                        />
                        <FontAwesomeIcon icon={faCopy} className={s.copyicon} />
                    </div>
                </div>

                <div className={s.field}>
                    <label className={s.status_bio_label} htmlFor="bio">Bio:</label>
                    <input
                        id={s.bio}
                        type="text"
                        name="bio"
                        onChange={onChangeHandler}
                        onBlur={onFocusRemoved}
                        maxLength="64"
                        value={input.bio}
                        placeholder="Write something!"
                        required
                        className={s.inputText}
                    />
                </div>
                <select onChange={onChangeHandler} onBlur={onFocusRemoved} name='theme' className='border-[1px] bg-white rounded-2xl h-10 p-2 border-black w-full placeholder:p-2 drop-shadow-sm '>
                    <option value='' className=''>url page theme...</option>
                    {
                        themes?.map((item) => {
                            return <option key={item._id} value={item._id} className=''> {item.name}</option>
                        })
                    }
                </select>
            </div>
        </div >
    );
}

export default ProfilePage;