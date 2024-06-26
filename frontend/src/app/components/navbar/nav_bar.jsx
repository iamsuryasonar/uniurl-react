import s from './nav_bar.module.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { APP_NAME, LOCAL_STORAGE_NAME } from '../../common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Transition } from 'react-transition-group';
import { toggleMenu, closeMenu } from '../../store/slices/menuSlice'
import { logout } from '../../store/slices/authSlice';
import { get_profile_info } from './../../store/slices/profileSlice'
import avatar from '../../assets/avatar.jpg';
import Searchbar from '../searchbar/searchbar'
import Message from '../../components/Message/Message'
import useLocationPathname from '../../hooks/useLocationPathname';

const NavBar = ({ isInputHidden, setIsInputHidden }) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem(LOCAL_STORAGE_NAME)

    const menu = useSelector(state => state.menu.value);
    const { loading } = useSelector((state) => state.loading);
    const { message } = useSelector((state) => state.message);
    const profileInfo = useSelector(state => state.profile.profileInfo)

    const [activeMenu] = useLocationPathname();
    const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar)
    const [searchedByKeywordValues, setSearchedByKeywordValues] = useState([])

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_NAME);
        if (token) {
            dispatch(get_profile_info())
        }
    }, [dispatch])

    useEffect(() => {
        if (profileInfo?.picture) {
            setImagePreviewUrl(profileInfo.picture.url);
        }
    }, [profileInfo]);

    const handleLogOut = () => {
        dispatch(closeMenu())
        dispatch(logout())
    }

    const searchKeywordHandler = (userdata) => {
        setSearchedByKeywordValues(userdata)
    }

    const keywordClickedHandler = (username) => {
        const originname = window.location.origin;
        window.location.replace(originname + '/' + username);
    }

    return <>
        {
            loading &&
            <div className={s.line_container}>
                <div className={s.moving_gradient}></div>
            </div>
        }
        {
            token ?
                //! private navbar
                <>
                    <nav className='bg-[#040C18] text-white sticky top-0 buttom-0 left-0 w-full overflow-hidden flex flex-col justify-center items-center z-50'>
                        <div className='max-w-5xl w-full flex justify-center items-center gap-4 px-6 py-4 '>
                            <div className='w-auto flex items-center'>
                                <Link to="/user/profile" className='w-10 h-10 flex items-center'>
                                    <img src={imagePreviewUrl} alt='user avatar' className='object-cover w-10 h-10 aspect-square rounded-full' />
                                </Link>
                                <Link to="/" className='font-bold text-xl ml-2' onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                            </div>
                            <div className='w-full flex flex-row justify-end items-center gap-4'>
                                {!menu && <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />}
                                {menu ?
                                    <FontAwesomeIcon
                                        className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Close Menu'
                                        icon={faXmark}
                                    />
                                    :
                                    <FontAwesomeIcon
                                        className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        icon={faBars}
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Open Menu'
                                    />
                                }
                            </div>
                            <div className='hidden md:flex gap-4 text-nowrap '>
                                <Link to="/user/myurls" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer flex items-center hover:border-slate-100 ${activeMenu === '/user/myurls' ? 'border-white' : ''}`} >My urls</Link>
                                <Link to="/user/create_url" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer flex items-center  hover:border-slate-100 ${activeMenu === '/user/create_url' ? 'border-white' : ''}`} >Create url</Link>
                                <Link to="/user/profile" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer flex items-center hover:border-slate-100 ${activeMenu === '/user/profile' ? 'border-white' : ''}`} >Profile</Link>
                                <div
                                    className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer flex items-center bg-white text-black hover:border-red-500 font-bold`}
                                    tabIndex={0}
                                    aria-label='log out button'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleLogOut()
                                        }
                                    }}
                                    onClick={handleLogOut}>Log out</div>
                            </div>
                        </div>
                        {
                            searchedByKeywordValues.length > 0 && !isInputHidden && !menu &&
                            <div className='w-full flex flex-col items-end bg-black'>
                                <div className='sticky top-10 z-20 w-full p-5 flex flex-col items-center gap-4 rounded-none text-white '>
                                    {searchedByKeywordValues.map((item) => {
                                        return <p
                                            className='rounded-full px-4 py-1 flex items-center cursor-pointer border border-1 border-transparent hover:border hover:border-white'
                                            key={item._id}
                                            onClick={() => { keywordClickedHandler(item.name) }}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    keywordClickedHandler(item.name)
                                                }
                                            }}>{item.name}</p>
                                    })}
                                </div>
                            </div>
                        }
                    </nav>
                    {<Transition in={menu} timeout={100}>
                        {(state) => (
                            <div className={`md:hidden fixed top-16 left-0 right-0 z-10 bg-black text-white w-full px-4 py-20 rounded-b-lg flex flex-col items-center justify-center gap-2 transition-transform transform ease-in-out duration-700 ${state === 'entered' ? '-translate-y-0 ' : '-translate-y-full '}`}>
                                <Link tabIndex={menu ? 0 : -1} to="/user/myurls" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer  text-center hover:border-slate-100  ${activeMenu === '/user/myurls' ? 'border-white' : ''}`} onClick={() => dispatch(closeMenu())}>My urls</Link>
                                <Link tabIndex={menu ? 0 : -1} to="/user/create_url" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer  text-center hover:border-slate-100  ${activeMenu === '/user/create_url' ? 'border-white' : ''}`} onClick={() => dispatch(closeMenu())}>Create url</Link>
                                <Link tabIndex={menu ? 0 : -1} to="/user/profile" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer flex -center hover:border-slate-100  ${activeMenu === '/user/profile' ? 'border-white' : ''}`} onClick={() => dispatch(closeMenu())}>Profile</Link>
                                <div className={`rounded-full py-1 px-2 border border-1 border-black bg-[#FF4820] cursor-pointer text-center text-white hover:border-red-500  font-bold`}
                                    tabIndex={menu ? 0 : -1}
                                    aria-label='log out button'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleLogOut()
                                        }
                                    }}
                                    onClick={handleLogOut}>Log out</div>
                            </div>
                        )}
                    </Transition >
                    }
                </>
                :
                //! public navbar
                <>
                    <nav className='bg-[#040C18] text-white sticky top-0 buttom-0 left-0 w-full overflow-hidden flex flex-col justify-center items-center z-50'>
                        <div className='max-w-5xl  w-full flex justify-center items-center  gap-4 px-6 py-4 '>
                            <Link to="/" className='font-bold text-xl' onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                            <div className='w-full flex flex-row justify-end items-center gap-4'>
                                {!menu && <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />}
                                {menu ?
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Close Menu'
                                    />
                                    :
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Open Menu' />
                                }
                            </div>
                            <div className='hidden md:flex gap-4 text-nowrap'>
                                <Link to="/user/login" className={`rounded-lg py-1 px-2 border border-black cursor-pointer  text-center hover:border-white ${activeMenu === 'login' ? 'border-white' : ''}`}>Log In</Link>
                                <Link to='/user/register' className={`bg-[#FF4820] rounded-lg py-1 px-2 border border-black cursor-pointer text-center font-bold hover:border-white ${activeMenu === 'register' ? 'border-white' : ''}`}>Get Started</Link>
                            </div>
                        </div>
                    </nav>
                    {<Transition in={menu} timeout={100}>
                        {(state) => (
                            <div className={`md:hidden fixed top-15 right-0 left-0 z-10 bg-black text-white px-4 py-10 rounded-b-lg flex-col items-center justify-between gap-4 flex text-nowrap transition-transform transform ease-in-out duration-700 ${state === 'entered' ? '-translate-y-0 ' : '-translate-y-full '}`}>
                                <Link tabIndex={menu ? 0 : -1} to="/user/login" className={`rounded-full py-1 px-2 border border-1 border-black cursor-pointer  text-center hover:border-slate-100 ${activeMenu === '/user/login' ? 'border-white' : ''}`} onClick={() => dispatch(closeMenu())} >Log In</Link>
                                <Link tabIndex={menu ? 0 : -1} to='/user/register' className={`rounded-full py-1 px-2 bg-[#FF4820] border border-1 border-black cursor-pointer  text-center hover:border-white font-bold ${activeMenu === '/user/register' ? 'border-white' : ''}`} onClick={() => dispatch(closeMenu())} >Get Started</Link>
                            </div>
                        )}
                    </Transition >
                    }
                    {
                        searchedByKeywordValues.length > 0 && !isInputHidden && !menu &&
                        <div className='w-full flex flex-col items-end bg-black'>
                            <div className='sticky top-10 z-20 w-full p-5 flex flex-col items-center gap-4 rounded-none text-white '>
                                {searchedByKeywordValues.map((item) => {
                                    return <p
                                        className='rounded-full px-4 py-1 flex items-center cursor-pointer border border-1 border-transparent hover:border hover:border-white'
                                        key={item._id}
                                        onClick={() => { keywordClickedHandler(item.name) }}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                keywordClickedHandler(item.name)
                                            }
                                        }}>{item.name}</p>
                                })}
                            </div>
                        </div>
                    }
                </>
        }
        {
            message &&
            <Message message={message} />
        }
    </>;
};

export default NavBar;
