import s from './Create_url.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { create_my_urls } from '../../store/slices/myUrlSlice';
import { clearMessage, setMessage } from '../../store/slices/messageSlice';
import Button from '../../components/Button/button';

function CreateUrl() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const [inputValue, setInputValue] = useState({
        'title': '',
        'url': '',
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

        dispatch(create_my_urls(inputValue)).unwrap().then(() => {
            setInputValue({
                'title': '',
                'url': '',
            })
        }).catch(() => {
        })
    }

    return (
        <div className={s.wrapper} >
            <input
                className={`${s.textsize} ${s.inputField}`}
                placeholder="Title"
                type="title"
                name="title"
                value={inputValue.title}
                required
                onChange={onChangeHandler}
            />
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