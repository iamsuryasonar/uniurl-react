import s from './Create_url.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
                    <Button className={s.create_url_button } onClick={createUrlHandler} label='Create' />
        </div >
    )
}
export default CreateUrl;