import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../store/slices/messageSlice'
import { login } from '../../store/slices/authSlice'
import Button from '../../components/button/Button';
import { setMessage } from '../../store/slices/messageSlice';
import GoogleLogInButton from '../../components/GoogleLogInButton';
import { Link, useNavigate } from 'react-router-dom';
import { loadingState } from '../../store/slices/loadingSlice';

function LogInPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [forgotpassword, setforgotpassword] = useState(false);
    const { loading } = useSelector(loadingState);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    let forgotpassword_handler = (e) => {
        setforgotpassword(!forgotpassword);
    }

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors({});
    }

    const logInHandler = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!input?.email) {
            newErrors.email = 'required';
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(input.email)) {
                newErrors.email = 'invalid';
            }
        }

        if (!input?.password) {
            newErrors.password = 'required';
        } else if (input.password.length < 6) {
            newErrors.password = 'min 6 characters';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(login(input));
    }

    const sendEmailHandler = (e) => {
        e.preventDefault();
        dispatch(setMessage('Feature coming soon.'));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000)
    }

    function handleDemoUserLogIn() {
        dispatch(login({
            email: 'johndoe@gmail.com',
            password: 'sadfasfhjt65fsd',
        })).finally(() => navigate('/user/myurls'))
    }

    return (
        <>
            <div className='w-full max-w-[450px] flex justify-center items-center place-self-center m-auto py-14 relative text-black'>
                <form className='w-full flex flex-col justify-between gap-2 p-4 border-[1px] border-slate-300 rounded-xl' onClick={(e) => e.preventDefault()}>
                    <p className='text-2xl font-extrabold font-sans'>Sign In</p>
                    <div>
                        <div className='flex items-center justify-between text-sm'>
                            <label htmlFor="email" className="text-black">Email</label>
                            {errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <input
                            id='email'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-300 w-full '
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
                        <div className='flex items-center justify-between text-sm'>
                            <label htmlFor="password" className="text-sm text-black">Password</label>
                            {errors.password && <p className='text-red-500'>{errors.password}</p>}
                        </div>
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
                                className='border-[1px] bg-transparent rounded-sm h-10 p-2 pr-8 border-slate-300 w-full '
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
                    {loading ? <Button className='text-white bg-black rounded-full border border-slate-300 px-4 py-1 min-w-24' label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className='text-white text-nowrap bg-black px-3 py-1 rounded-full border border-1 border-black hover:border-black hover:bg-white hover:text-black' onClick={logInHandler} label='Sign In' />}
                    <div className='flex flex-col'>
                        <button className='cursor-pointer text-slate-500 hover:text-black place-self-end' onClick={forgotpassword_handler}>Reset password?</button>
                        <button
                            className="cursor-pointer text-slate-500 hover:text-black place-self-end"
                            onClick={handleDemoUserLogIn}>Sign in as demo user
                        </button>
                    </div>
                    <div className='w-full h-[1px] bg-slate-600'>  </div>
                    <p className='place-self-center'>Don't have an account?</p>
                    <Link to="/user/register" className='text-black text-nowrap flex items-center justify-center gap-2 bg-transparent px-5 py-1 rounded-full border border-1 border-slate-300 hover:border-black hover:bg-black hover:text-white cursor-pointer'>Sign up</Link>
                    <div className='flex items-center'>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                        <p className='px-[10px]'>or</p>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                    </div>
                    <GoogleLogInButton />
                </form>
                {forgotpassword && (
                    <form className='bg-white absolute top-0 left-0 bottom-0 right-0 flex flex-col z-10'>
                        <div className='w-full p-6 slate-50 shadow-md rounded-xl'>
                            <p className='my-5 text-2xl'>Reset password</p>
                            <input
                                placeholder="Email"
                                type="email"
                                name="Email"
                                autoComplete="off"
                                required
                                aria-label="Email"
                                className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-300 w-full '
                            />
                            <div className='flex justify-between mt-6'>
                                <Button className='text-black bg-transparent px-4 py-1 rounded-full border border-1 border-slate-300 hover:border-black' onClick={forgotpassword_handler} label='Cancel' />
                                <Button className='text-white bg-black px-4 py-1 rounded-full border border-1 border-black hover:bg-white hover:text-black' label='Send Email' onClick={sendEmailHandler} />
                            </div>
                        </div >
                    </form >
                )}
            </div >
        </>
    );
}

export default LogInPage;