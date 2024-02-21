import s from './Create_url.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { create_my_urls } from '../../store/slices/myUrlSlice';
import { clearMessage, setMessage } from '../../store/slices/messageSlice';
import Button from '../../components/Button/button';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function CreateUrl() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const [color, setColor] = useColor("#123123");

    const [inputValue, setInputValue] = useState({
        'title': '',
        'url': '',
        'icon': '',
    });

    const onChangeHandler = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        })
    }

    const createUrlHandler = () => {
        let flag = '';
        if (inputValue?.title?.length < 1) {
            flag = 'Title';
        }
        if (inputValue?.url?.length < 1) {
            flag = 'URL';
        }
        if (flag !== '') {
            dispatch(setMessage(flag + ' must not be empty!'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
            return;
        }

        dispatch(create_my_urls({ ...inputValue, color: color?.hex })).unwrap().then(() => {
            setInputValue({
                'title': '',
                'url': '',
                'icon': '',
            })
        }).catch(() => {
        })
    }

    const iconArr = [
        { name: 'linkedin', icon: 'fab fa-linkedin' },
        { name: 'facebook', icon: 'fab fa-facebook' },
        { name: 'instagram', icon: 'fab fa-instagram' },
        { name: 'youtube', icon: 'fab fa-youtube' },
        { name: 'discord', icon: 'fab fa-discord' },
        { name: 'github', icon: 'fab fa-github' },
        { name: 'url', icon: 'fas fa-link' },
    ];


    return (
        <div className={s.wrapper} >
            <select onChange={onChangeHandler} name='icon' className='border-[1px] bg-white rounded-sm h-10 p-2 border-black w-full placeholder:p-2 drop-shadow-sm '>
                <option value='' className=''>select icon...</option>
                {
                    iconArr?.map((item) => {
                        return <option key={item.name} value={item.icon} className=''> {item.name}</option>
                    })
                }
            </select>

            <input
                className={`${s.textsize} ${s.inputField}`}
                placeholder="Title"
                type="title"
                name="title"
                value={inputValue.title}
                required
                onChange={onChangeHandler}
            />
            <div className='w-full'>
                <p className='pb-2'>Select title/icon color</p>
                <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor} />
            </div>

            <input
                className={`${s.textsize} ${s.inputField}`}
                placeholder="Url"
                type="url"
                name="url"
                value={inputValue.url}
                required
                onChange={onChangeHandler}
            />
            <Button className={s.create_url_button} onClick={createUrlHandler} label='Create' />
        </div >
    )
}
export default CreateUrl;