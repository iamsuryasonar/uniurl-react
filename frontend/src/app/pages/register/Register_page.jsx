import s from './Register_page.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage } from '../../store/slices/messageSlice'
import Button from '../../components/Button/button';
import Message from '../../components/Message/Message'
import Footer from '../../components/Footer/Footer'
function RegisterPage() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({});
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const registerHandler = () => {
        setSuccessful(false);
        dispatch(register(input))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }


    return (
        <>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <ul >
                        <li className={s.list_items}>
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Username"
                                type="text"
                                name="name"
                                // autoComplete="off"
                                required
                                onChange={onChangeHandler}
                            />
                        </li>
                        <li className={s.list_items}>
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Email"
                                type="email"
                                name="email"
                                // autoComplete="off"
                                required
                                onChange={onChangeHandler}
                            />
                        </li>
                        <li className={s.list_items}>
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Password"
                                type="password"
                                name="password"
                                // autoComplete="off"
                                required
                                onChange={onChangeHandler}
                            />
                        </li>
                        <li className={s.list_items}>
                            <div className={s.loginandalreadyuser}>
                                <Button onClick={registerHandler} label='Register' />
                                <Link to="/user/login">Already have an account?</Link>
                            </div>
                        </li>
                        {message && <Message label={message} />}
                    </ul >
                </div >

            </div >

            <Footer /></>
    )
}

export default RegisterPage;