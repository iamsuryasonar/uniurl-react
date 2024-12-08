import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage, setMessage } from '../../store/slices/messageSlice'
import Button from '../../components/Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import loginRegisterImage from '../../assets/login_register_image.png'
import GoogleLogInButton from "../../components/GoogleLogInButton";

function RegisterPage() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.loading);
    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        let flag = '';
        if (input?.name?.length < 7) {
            flag = 'Name';
        }
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
            return;
        }

        dispatch(register(input));
    }

    return (
        <>
            <div className='w-full max-w-[450px] md:max-w-5xl rounded-md bg-slate-800 grid grid-cols-1 md:grid-cols-2 justify-center items-center place-self-center m-auto relative text-white'>
                <div className="w-full">
                    <img className="w-full" src={loginRegisterImage} alt='log in banner' />
                </div>
                <form className='w-full p-4 flex flex-col gap-2' >
                    <p className='text-2xl font-extrabold font-sans'>Sign Up</p>
                    <div>
                        <label htmlFor="name" className="text-sm text-slate-300">Name</label>
                        <input
                            id='name'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-400 w-full'
                            placeholder="Username"
                            type="text"
                            name="name"
                            required
                            aria-label="Username"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm text-slate-300">Email</label>
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
                        <label htmlFor="password" className="text-sm text-slate-300">Password</label>
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
                            <FontAwesomeIcon className='absolute right-2'
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