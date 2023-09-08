import s from './Create_url.module.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { create_my_urls } from '../../store/slices/myUrlSlice';
import { clearMessage } from '../../store/slices/messageSlice';
import Button from '../../components/Button/button';
import Message from '../../components/Message/Message'


function CreateUrl() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const { message } = useSelector((state) => state.message);
    const [inputValue, setInputValue] = useState({
        'title': '',
        'description': '',
        'url': '',
    });

    const onChangeHandler = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        })
    }

    const createUrlHandler = () => {
        dispatch(create_my_urls(inputValue)).unwrap().then(() => {
            setInputValue({
                'title': '',
                'description': '',
                'url': '',
            })
        }).catch(() => {

        })
    }

    return (
        <div className={s.wrapper} >
            <div className={s.container}>

                <ul>

                    <li className={s.list_items}>
                        <input
                            className={`${s.textsize} ${s.inputField}`}
                            placeholder="Title"
                            type="title"
                            name="title"
                            value={inputValue.title}
                            required
                            onChange={onChangeHandler}
                        />
                    </li>
                    <li className={s.list_items}>
                        <input
                            className={`${s.textsize} ${s.inputField}`}
                            placeholder="Description"
                            type="description"
                            name="description"
                            value={inputValue.description}
                            required
                            onChange={onChangeHandler}
                        />
                    </li>
                    <li className={s.list_items}>
                        <input
                            className={`${s.textsize} ${s.inputField}`}
                            placeholder="Url"
                            type="url"
                            name="url"
                            value={inputValue.url}
                            required
                            onChange={onChangeHandler}
                        />
                    </li>
                    {message && <Message label={message} />}
                    <li className={s.list_items}>
                        <Button onClick={createUrlHandler} label='Create' />
                    </li>
                </ul>
            </div >
        </div >
    )
}
export default CreateUrl;