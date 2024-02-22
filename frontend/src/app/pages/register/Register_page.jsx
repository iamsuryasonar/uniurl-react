import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
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

        e.preventDefault();
        dispatch(register(input));
    }

    return (
        <>
            <div className='w-full flex flex-col p-14 '>
                <div className='flex flex-col justify-between gap-4' >
                    <p className='text-4xl font-extrabold font-sans'>Sign Up</p>
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full '
                        placeholder="Username"
                        type="text"
                        name="name"
                        required
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full '
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        onChange={onChangeHandler}
                    />
                    <input
                        className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full '
                        placeholder="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        required
                        onChange={onChangeHandler}
                    />
                    <div className='flex  justify-between items-center mt-6'>
                        <Button className='text-white bg-black px-4 py-2' onClick={registerHandler} label='Sign Up' />
                        <Link className='cursor-pointer hover:text-green-500' to="/user/login">Already have a user?</Link>
                    </div>
                </div >
            </div >
        </>
    )
}

export default RegisterPage;