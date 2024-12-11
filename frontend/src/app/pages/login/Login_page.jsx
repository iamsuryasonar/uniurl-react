import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice'
import { login } from '../../store/slices/authSlice'
import Button from '../../components/Button/button';
import { setMessage } from '../../store/slices/messageSlice';
import GoogleLogInButton from '../../components/GoogleLogInButton';
import { Link } from 'react-router-dom';
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
            <div className='w-full max-w-[450px] flex justify-center items-center place-self-center m-auto py-14 relative text-white'>
                <form className='w-full flex flex-col justify-between gap-2' onClick={(e) => e.preventDefault()}>
                    <p className='text-2xl font-extrabold font-sans'>Sign In</p>
                    <div>
                        <label htmlFor="email" className="text-sm text-slate-300">Email</label>
                        <input
                            id='email'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={input.email}
                            required
                            aria-label="Email"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-slate-300">Password</label>
                        <div className='relative flex  flex-col justify-center'>
                            <input
                                id='password'
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
                            <FontAwesomeIcon className='absolute cursor-pointer right-2'
                                onClick={() => { setShowPassword(!showPassword) }}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setShowPassword(!showPassword)
                                    }
                                }}
                                icon={showPassword ? faEye : faEyeSlash} />
                        </div>
                    </div>
                    {loading ? <Button className='text-white bg-black rounded-full border border-white px-4 py-1 min-w-24' label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className='text-white text-nowrap bg-black px-3 py-1 rounded-full border border-1 hover:border-black hover:bg-white hover:text-black' onClick={logInHandler} label='Sign In' />}
                    <div className='flex flex-col'>
                        <button className='cursor-pointer text-slate-400 hover:text-white place-self-end' onClick={forgotpassword_handler}>Reset password?</button>
                        <button
                            className="cursor-pointer text-slate-400 hover:text-white place-self-end"
                            onClick={handleAutoFillGuestCreds}>Auto fill guest credentials
                        </button>
                    </div>
                    <div className='w-full h-[1px] bg-slate-600'>  </div>
                    <p className='place-self-center'>Don't have an account?</p>
                    <Link to="/user/register" className='text-white text-nowrap flex items-center justify-center gap-2 bg-transparent px-5 py-1 rounded-full border border-1 hover:border-white hover:bg-white hover:text-black cursor-pointer'>Sign up</Link>
                    <div className='flex items-center'>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                        <p className='px-[10px]'>or</p>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                    </div>
                    <GoogleLogInButton />
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
                                <Button className='text-white bg-black px-4 py-1 rounded-full border border-1 hover:border-white hover:bg-white hover:text-black' onClick={forgotpassword_handler} label='Cancel' />
                                <Button className='text-white bg-black px-4 py-1 rounded-full border border-1 hover:border-white hover:bg-white hover:text-black' label='Send Email' onClick={send_email_handler} />
                            </div>
                        </div >
                    </form >
                )}
            </div >
        </>
    );
}

export default LogInPage;