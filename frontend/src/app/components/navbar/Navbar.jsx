import s from './nav_bar.module.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { APP_NAME } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Transition } from 'react-transition-group';
import { toggleMenu, closeMenu, menuState } from '../../store/slices/menuSlice'
import { authState } from '../../store/slices/authSlice';
import { get_profile_info, profileState } from '../../store/slices/profileSlice'
import avatar from '../../assets/avatar.jpg';
import Searchbar from '../searchbar/Searchbar'
import useLocationPathname from '../../hooks/useLocationPathname';
import { loadingState } from '../../store/slices/loadingSlice';

const Navbar = ({ isInputHidden, setIsInputHidden }) => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(authState);

    const menu = useSelector(menuState);
    const { loading } = useSelector(loadingState);
    const profileInfo = useSelector(profileState)

    const [activeMenu] = useLocationPathname();
    const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar)
    const [searchedByKeywordValues, setSearchedByKeywordValues] = useState([])

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(get_profile_info())
        }
    }, [isLoggedIn, dispatch])

    useEffect(() => {
        if (profileInfo?.picture) {
            setImagePreviewUrl(profileInfo.picture.url);
        }
    }, [profileInfo]);



    const searchKeywordHandler = (userdata) => {
        setSearchedByKeywordValues(userdata)
    }

    return <>
        {
            loading &&
            <div className={s.line_container}>
                <div className={s.moving_gradient}></div>
            </div>
        }
        <nav className='bg-slate-50 shadow-md h-[65px] text-black sticky top-0 buttom-0 left-0 w-full overflow-hidden flex flex-col justify-center items-center z-30'>
            {
                isLoggedIn ?
                    //! private navbar
                    <>
                        <div className='max-w-7xl w-full flex justify-center items-center gap-4 px-6 py-0'>
                            <div className='w-auto flex items-center'>
                                <Link to="/user/profile" className='w-10 h-10 flex items-center'>
                                    <img src={imagePreviewUrl} alt='user avatar' className='object-cover w-10 h-10 aspect-square rounded-full' />
                                </Link>
                                <Link to="/" className='font-bold text-xl ml-2' onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                            </div>
                            <div className='w-full flex flex-row justify-end items-center gap-4'>
                                {!menu && <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />}
                                {!menu &&
                                    <button
                                        className=''
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Open Menu'>
                                        <FontAwesomeIcon
                                            className='outline-none flex md:hidden cursor-pointer text-2xl'
                                            icon={faBars}

                                        />
                                    </button>
                                }
                            </div>
                            <div className='hidden md:flex gap-4 text-nowrap '>
                                <Link to="/user/myurls" className={`rounded-full py-1 px-4 border-[1px] hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black ${activeMenu === 'myurls' ? 'border-slate-900 bg-slate-900 text-white' : ''}`} >My urls</Link>
                                <Link to="/user/profile" className={`rounded-full py-1 px-4 border-[1px] hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black ${activeMenu === 'profile' ? 'border-slate-900 bg-slate-900 text-white' : ''}`} >Profile</Link>
                            </div>
                        </div>
                        <SearchedValuesContainer
                            searchedByKeywordValues={searchedByKeywordValues}
                            isInputHidden={isInputHidden}
                            menu={menu}
                        />
                        {<Transition in={menu} timeout={100}>
                            {(state) => (
                                <div className={`md:hidden fixed top-0 left-0 right-0 z-10 bg-white text-black shadow-md w-full px-4 py-20 rounded-b-lg flex flex-col items-center justify-center gap-2 transition-transform transform ease-in-out duration-700 ${state === 'entered' ? '-translate-y-0 ' : '-translate-y-full '}`}>
                                    <button
                                        className='absolute top-6 right-6'
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Close Menu'
                                    >
                                        <FontAwesomeIcon
                                            className='outline-none flex md:hidden cursor-pointer text-2xl'
                                            icon={faXmark}
                                        />
                                    </button>
                                    <Link tabIndex={menu ? 0 : -1} to="/user/myurls" className={`rounded-full py-1 px-4 border-[1px] hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black ${activeMenu === 'myurls' ? 'border-slate-900 bg-slate-900 text-white' : ''}`} onClick={() => dispatch(closeMenu())}>My urls</Link>
                                    <Link tabIndex={menu ? 0 : -1} to="/user/profile" className={`rounded-full py-1 px-4 border-[1px] hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black ${activeMenu === 'profile' ? 'border-slate-900 bg-slate-900 text-white' : ''}`} onClick={() => dispatch(closeMenu())}>Profile</Link>
                                </div>
                            )}
                        </Transition >
                        }
                    </>
                    :
                    //! public navbar
                    <>
                        <div className='max-w-7xl  w-full flex justify-center items-center  gap-4 px-6'>
                            <Link to="/" className='font-bold text-xl' onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                            <div className='w-full flex flex-row justify-end items-center gap-4'>
                                {!menu && <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />}
                                {!menu &&
                                    <button onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Open Menu'>
                                        <FontAwesomeIcon
                                            icon={faBars}
                                            className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        />
                                    </button>
                                }
                            </div>
                            <div className='hidden md:flex gap-4 text-nowrap'>
                                <Link to="/user/login" className={`rounded-full py-1 px-4 border-[1px] border-slate-300 hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black  ${activeMenu === 'login' ? 'border-slate-900 bg-slate-900 text-white' : ''}`}>Log In</Link>
                                <Link to='/user/register' className={`rounded-full py-1 px-4 border-[1px] border-slate-300 hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black  ${activeMenu === 'register' ? 'border-slate-900 bg-slate-900 text-white' : ''}`}>Get Started</Link>
                            </div>
                        </div>
                        {<Transition in={menu} timeout={100}>
                            {(state) => (
                                <div className={`md:hidden fixed top-0 left-0 right-0 z-10 bg-slate-50 text-black w-full px-4 py-20 rounded-b-lg flex flex-col items-center justify-center gap-2 transition-transform transform ease-in-out duration-700 shadow-md ${state === 'entered' ? '-translate-y-0 ' : '-translate-y-full '}`}>
                                    <button
                                        className='absolute top-6 right-6'
                                        onClick={() => dispatch(toggleMenu())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleMenu()
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label='Close Menu'>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className='outline-none flex md:hidden cursor-pointer text-2xl'
                                        />
                                    </button>
                                    <Link tabIndex={menu ? 0 : -1} to="/user/login" className={`rounded-full py-1 px-4 border-[1px] border-slate-300 hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black  ${activeMenu === 'login' ? 'border-slate-600 bg-white text-black' : ''}`} onClick={() => dispatch(closeMenu())} >Log In</Link>
                                    <Link tabIndex={menu ? 0 : -1} to='/user/register' className={`rounded-full py-1 px-4 border-[1px] border-slate-300 hover:border-slate-600 cursor-pointer text-center hover:bg-white hover:text-black  ${activeMenu === 'register' ? 'border-slate-600 bg-white text-black' : ''}`} onClick={() => dispatch(closeMenu())} >Get Started</Link>
                                </div>
                            )}
                        </Transition >
                        }
                        <SearchedValuesContainer
                            searchedByKeywordValues={searchedByKeywordValues}
                            isInputHidden={isInputHidden}
                            menu={menu}
                        />
                    </>
            }
        </nav>
    </>;
};

export default Navbar;

function SearchedValuesContainer({ searchedByKeywordValues, isInputHidden, menu }) {
    const originname = window.location.origin;

    return <>
        {
            searchedByKeywordValues.length > 0 && !isInputHidden && !menu &&
            <div className='fixed top-[65px] z-20 w-full  flex flex-col items-center bg-slate-50 shadow-md'>
                <div className='w-full max-w-[400px] p-5 flex flex-col items-center gap-4 text-black'>
                    {searchedByKeywordValues.map((item) => {
                        return <a
                            key={item._id}
                            href={originname + '/' + item.username}
                            target='_blank'
                            rel='noopener'
                            className='rounded-full px-4 py-1 flex items-center cursor-pointer border border-1 border-transparent hover:border hover:border-slate-300'
                            tabIndex={0}
                        >{item.username}</a>
                    })}
                </div>
            </div>
        }
    </>
}