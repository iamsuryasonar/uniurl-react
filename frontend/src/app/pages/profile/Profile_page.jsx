import React, { useState, useEffect } from 'react';
import s from './Profile_page.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { upload_profile_picture, get_profile_info, update_bio_or_status } from './../../store/slices/profileSlice'
import Message from '../../components/Message/Message'

const ProfilePage = () => {
    const dispatch = useDispatch();

    const profileInfo = useSelector(state => state.profile.profileInfo)
    console.log(profileInfo)
    const { message } = useSelector((state) => state.message);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true')
    const [name, setName] = useState('');
    const [input, setInput] = useState({
        'status': '',
        'bio': ''
    });

    useEffect(() => {
        dispatch(get_profile_info())
    }, []);

    useEffect(() => {

        if (profileInfo?.picture) {
            const dataURL = `data:image/png;base64,${profileInfo.picture}`;
            setImagePreviewUrl(dataURL);
        }
        if (profileInfo?.status) {
            setInput({
                'status': profileInfo.status,
            })
        }
        if (profileInfo?.bio) {
            setInput({
                'bio': profileInfo.bio
            })
        }
        if (profileInfo?.name) {
            setName(profileInfo?.name);
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
        setInput(
            {
                ...input,
                [e.target.name]: e.target.value,
            }
        )
    }

    const onFocusRemoved = () => {
        dispatch(update_bio_or_status(input))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.card}>
                <div className={s.container}>
                    <h1>Profile Card</h1>
                    <label htmlFor="photo-upload" className={`${s['custom-file-upload']} ${s.fas} ${s.label}`}>
                        <div className={`${s['img-wrap']} ${s['img-upload']}`}>
                            <img htmlFor="photo-upload" src={imagePreviewUrl} className={s.img} />
                        </div>
                        <input id='photo-upload' type="file" name='file' onChange={photoUpload} accept="image/*" className={`${s.inputFile}`} />
                    </label>
                    <div className={s.field}>
                        <label htmlFor="name">username:</label>
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
                    </div>
                    <div className={s.field}>
                        <label htmlFor="status">status:</label>
                        <input
                            id={s.status}
                            type="text"
                            name="status"
                            onChange={onChangeHandler}
                            onBlur={onFocusRemoved}
                            maxLength="42"
                            value={input.status}
                            placeholder="It's a nice day!"
                            required
                            className={s.inputText}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="bio">bio:</label>
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
                </div>
            </div>
        </div >
    );
}

export default ProfilePage;