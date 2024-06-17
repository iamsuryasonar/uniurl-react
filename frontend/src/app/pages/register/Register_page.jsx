import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { register } from '../../store/slices/authSlice'
import { clearMessage, setMessage } from '../../store/slices/messageSlice'
import Button from '../../components/Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'


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
            <div className='w-full max-w-xl flex flex-col place-self-center m-auto pb-14 relative text-white'>
                <form className='flex flex-col justify-between gap-4' >
                    <p className='text-4xl font-extrabold font-sans'>Sign Up</p>
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                        placeholder="Username"
                        type="text"
                        name="name"
                        required
                        aria-label="Username"
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                        placeholder="Email"
                        type="email"
                        name="email"
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
                            placeholder="Password"
                            aria-label="Password"
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 pr-8 border-white w-full '
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
                    <div className='flex  justify-between items-center gap-2'>
                        {loading ? <Button className='text-white bg-black border border-white  px-4 py-2 min-w-24' label={<FontAwesomeIcon icon={faSpinner} spinPulse />} /> : <Button className='text-white bg-black px-4 py-2 border border-1 hover:border-black hover:bg-white hover:text-black' onClick={registerHandler} label='Sign Up' />}
                        <Link className='cursor-pointer hover:text-[#FF4820]' to="/user/login">Already have a user?</Link>
                    </div>
                </form >
            </div >
        </>
    )
}

export default RegisterPage;