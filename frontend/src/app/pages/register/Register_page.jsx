import s from './Register_page.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage, setMessage } from '../../store/slices/messageSlice'
import Button from '../../components/Button/button';

function RegisterPage() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({});


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
        let flag = '';
        if (input.name.length < 7) {
            flag = 'Name';
        }
        if (input.email.length < 7) {
            flag = 'Email';
        }
        if (input.password.length < 7) {
            flag = 'Password';
        }
        if (flag !== '') {
            dispatch(setMessage(flag + ' must be 6 characters long!'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
            return;
        }

        e.preventDefault();
        dispatch(register(input));
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
                        <Button className={s.register_button} onClick={registerHandler} label='Register' />
                        <Link className={s.already_a_user_title} to="/user/login">Already have a user?</Link>
                    </div>
                </div >
            </div >
        </>
    )
}

export default RegisterPage;