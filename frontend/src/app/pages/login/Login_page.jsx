import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import s from './Login_page.module.css'
import { clearMessage } from '../../store/slices/messageSlice'
import { login } from '../../store/slices/authSlice'
import Button from '../../components/Button/button';
import { setMessage } from '../../store/slices/messageSlice';

function LogInPage() {
    const [forgotpassword, setforgotpassword] = useState(false);
    const [loading, setLoading] = useState(false);

    let forgotpassword_handler = (e) => {
        setforgotpassword(!forgotpassword);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    const logInHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(input))
            .unwrap()
            .then(() => {
                navigate("/user/myurls");
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const send_email_handler = (e) => {
        e.preventDefault();
        dispatch(setMessage('Not implemented!!!'))
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000)
    }


    return (
        <>
            <div className={s.wrapper} >
                <div className={s.container} >
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
                        required
                        // autoComplete="current-password"
                        onChange={onChangeHandler}
                    />
                    <div className={s.loginandforgotpassword}>
                        {loading ? <Button className={s.log_in_button} label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className={s.log_in_button} onClick={logInHandler} label='Log In' />}
                        <a className={s.reset_title} onClick={forgotpassword_handler}>Reset password?</a>
                    </div>
                </div>
                {forgotpassword && (
                    <form className={s.forgotpassword_overlay}>
                        <div className={s.list_items}>
                            <p className={s.reset_title}>Reset password</p>
                            <input
                                placeholder="Email"
                                type="email"
                                name="Email"
                                autocomplete="off"
                                required
                                className={`${s.textsize} ${s.inputField}`}
                            />
                            <div className={s.overlaybuttons}>
                                <Button onClick={forgotpassword_handler} label='Cancel' />
                                <Button className={s.send_email_button} label='Send Email' onClick={send_email_handler} />
                            </div>
                        </div >
                    </form >
                )}
            </div >
        </>
    );
}

export default LogInPage;