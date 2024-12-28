import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage, setMessage } from '../../store/slices/messageSlice'
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import GoogleLogInButton from "../../components/GoogleLogInButton";
import ProfileService from '../../services/profile.services';
import { loadingState } from "../../store/slices/loadingSlice";

function RegisterPage() {
    const dispatch = useDispatch();
    const { loading } = useSelector(loadingState);
    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [errors, setErrors] = useState({});

    const onChangeHandler = async (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors({});

        if (e.target.name === 'username' && e.target.value.length >= 6) {
            const res = await ProfileService.isUsernameExists(e.target.value);
            setUsernameAvailable(!res?.data?.isExist);
        }
    }

    const registerHandler = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!input?.username) {
            newErrors.username = 'required';
        } else if (input.username.length < 6) {
            newErrors.username = 'min 6 characters';
        }

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

        dispatch(register(input));
    }

    return (
        <>
            <div className='w-full max-w-[450px] flex justify-center items-center place-self-center py-14 m-auto relative text-white'>
                <form className='w-full flex flex-col gap-2' >
                    <p className='text-2xl font-extrabold font-sans'>Sign Up</p>
                    <div>
                        <div>
                            <div className='flex items-center justify-between text-sm'>
                                <label htmlFor="username" className="text-sm text-slate-300">Username</label>
                                {errors.username && <p className='text-red-500'>{errors.username}</p>}
                            </div>
                            <input
                                id='username'
                                className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-400 w-full'
                                placeholder="Username"
                                type="text"
                                name="username"
                                required
                                aria-label="Username"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className=''>
                            {
                                input?.username && input?.username?.length > 5 && <>
                                    {
                                        usernameAvailable ?
                                            <p className='text-sm text-green-500'>Username available</p>
                                            :
                                            <p className='text-sm text-red-500'>Username not available</p>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between text-sm'>
                            <label htmlFor="email" className="text-slate-300">Email</label>
                            {errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <input
                            id="email"
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-400 w-full '
                            placeholder="Email"
                            type="email"
                            name="email"
                            required
                            aria-label="Email"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <div className='flex items-center justify-between text-sm'>
                            <label htmlFor="password" className="text-sm text-slate-300">Password</label>
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
                                placeholder="Password"
                                aria-label="Password"
                                className='border-[1px] bg-transparent rounded-sm h-10 p-2 pr-8 border-slate-400 w-full '
                            ></input>
                            <FontAwesomeIcon className='absolute cursor-pointer right-2'
                                onClick={() => { setShowPassword(!showPassword) }}
                                icon={showPassword ? faEye : faEyeSlash}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setShowPassword(!showPassword)
                                    }
                                }} />
                        </div>
                    </div>
                    {loading ? <Button className='text-white bg-black border border-white rounded-full px-3 py-1 min-w-24' label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className='text-white text-nowrap bg-black px-3 py-1 rounded-full border border-1 hover:border-black hover:bg-white hover:text-black' onClick={registerHandler} label='Sign Up' />}
                    <div className='w-full h-[1px] my-2 bg-slate-600'>  </div>
                    <p className='place-self-center'>Already have a user?</p>
                    <Link to="/user/login" className='text-white text-nowrap flex items-center justify-center gap-2 bg-transparent px-5 py-1 rounded-full border border-1 hover:border-white hover:bg-white hover:text-black cursor-pointer'>Sign in</Link>
                    <div className='flex items-center'>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                        <p className='px-[10px]'>or</p>
                        <div className='w-full h-[1px] bg-slate-600'>  </div>
                    </div>
                    <GoogleLogInButton />
                </form >
            </div >
        </>
    )
}

export default RegisterPage;