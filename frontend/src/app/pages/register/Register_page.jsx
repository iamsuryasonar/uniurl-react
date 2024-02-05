import s from './Register_page.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage } from '../../store/slices/messageSlice'
import Button from '../../components/Button/button';
import Message from '../../components/Message/Message'

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

    const registerHandler = (e) => {
        e.preventDefault();
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
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Username"
                                type="text"
                                name="name"
                                required
                                onChange={onChangeHandler}
                            />
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Email"
                                type="email"
                                name="email"
                                required
                                onChange={onChangeHandler}
                            />
                            <input
                                className={`${s.textsize} ${s.inputField}`}
                                placeholder="Password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                onChange={onChangeHandler}
                            />
                            <div className={s.loginandalreadyuser}>
                                <Button onClick={registerHandler} label='Register' />
                                <Link to="/user/login">Already have a user?</Link>
                            </div>
                </div >
            </div >
        </>
    )
}

export default RegisterPage;