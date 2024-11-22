import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice'
import { login } from '../../store/slices/authSlice'
import Button from '../../components/Button/button';
import { setMessage } from '../../store/slices/messageSlice';


function LogInPage() {
    const [forgotpassword, setforgotpassword] = useState(false);
    const { loading } = useSelector((state) => state.loading);
    const [showPassword, setShowPassword] = useState(false);

    let forgotpassword_handler = (e) => {
        setforgotpassword(!forgotpassword);
    }

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const logInHandler = (e) => {
        e.preventDefault();
        let flag = '';
        if (input?.email?.length < 7) {
            flag = 'Email';
        }
        if (input?.password?.length < 7) {
            flag = 'Password';
        }
        if (flag !== '') {
            dispatch(setMessage(flag + ' must be 6 characters long!'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
            flag = '';
            return;
        }

        dispatch(login(input))
    }

    const send_email_handler = (e) => {
        e.preventDefault();
        dispatch(setMessage('Not implemented!!!'))
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000)
    }

    function handleAutoFillGuestCreds() {
        setInput({
            email: 'johndoe@gmail.com',
            password: 'sadfasfhjt65fsd',
        })
    }


    return (
        <>
            <div className='w-full max-w-xl flex flex-col place-self-center m-auto pb-14 relative text-white'>
                <form className='flex flex-col justify-between gap-4' onClick={(e) => e.preventDefault()}>
                    <p className='text-4xl font-extrabold font-sans'>Log In</p>
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={input.email}
                        required
                        aria-label="Email"
                        onChange={onChangeHandler}
                    />
                    <div className='relative flex  flex-col justify-center'>
                        <input
                            onChange={onChangeHandler}
                            name="password"
                            required
                            autoComplete="off"
                            type={showPassword ? 'text' : 'password'}
                            value={input.password}
                            placeholder="Password"
                            aria-label="Password"
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 pr-8 border-white w-full '
                        ></input>
                        <FontAwesomeIcon className='absolute right-2'
                            onClick={() => { setShowPassword(!showPassword) }}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setShowPassword(!showPassword)
                                }
                            }}
                            icon={showPassword ? faEye : faEyeSlash} />
                    </div>

                    <div className='flex justify-between items-center'>
                        {loading ? <Button className='text-white bg-black border border-white px-4 py-2 min-w-24' label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className='text-white bg-black px-4 py-2 border border-1 hover:border-black hover:bg-white hover:text-black' onClick={logInHandler} label='Log In' />}
                        <button className='cursor-pointer hover:text-[#FF4820]' onClick={forgotpassword_handler}>Reset password?</button>
                    </div>
                    <button
                        className="cursor-pointer hover:text-[#67ff20] hover:border-[#67ff20] place-self-end border-2 px-2 py-1 border-white"
                        onClick={handleAutoFillGuestCreds}>Auto fill guest credentials
                    </button>
                </form>
                {forgotpassword && (
                    <form className='bg-[#040C18] absolute top-0 left-0 bottom-0 right-0 flex flex-col z-10'>
                        <div className='w-full p-6'>
                            <p className='my-5 text-2xl'>Reset password</p>
                            <input
                                placeholder="Email"
                                type="email"
                                name="Email"
                                autoComplete="off"
                                required
                                aria-label="Email"
                                className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                            />
                            <div className='flex justify-between mt-6'>
                                <Button className='text-white bg-black px-4 py-2 border border-1 hover:border-white hover:bg-white hover:text-black' onClick={forgotpassword_handler} label='Cancel' />
                                <Button className='text-white bg-black px-4 py-2 border border-1 hover:border-white hover:bg-white hover:text-black' label='Send Email' onClick={send_email_handler} />
                            </div>
                        </div >
                    </form >
                )}
            </div >
        </>
    );
}

export default LogInPage;