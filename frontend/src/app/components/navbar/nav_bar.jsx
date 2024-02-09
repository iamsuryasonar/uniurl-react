import { useState, useEffect } from 'react';
import s from './nav_bar.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Searchbar from '../searchbar/searchbar'
import { APP_NAME, LOCAL_STORAGE_NAME } from '../../common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { toggleMenu, closeMenu } from '../../store/slices/menuSlice'
import { useDispatch, useSelector } from 'react-redux';
import { get_profile_info } from './../../store/slices/profileSlice'
import avatar from '../../assets/avatar.jpg';
import Message from '../../components/Message/Message'
import { clearMessage } from '../../store/slices/messageSlice';

const NavBar = ({ isInputHidden, setIsInputHidden }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const currentPageName = window.location.pathname;

    const token = localStorage.getItem(LOCAL_STORAGE_NAME)

    const menu = useSelector(state => state.menu.value);
    const { loading } = useSelector((state) => state.loading);
    const { message } = useSelector((state) => state.message);

    const [activeMenu, setActiveMenu] = useState(currentPageName);

    const profileInfo = useSelector(state => state.profile.profileInfo)
    const [imagePreviewUrl, setImagePreviewUrl] = useState(avatar)
    const [searchedByKeywordValues, setSearchedByKeywordValues] = useState([])


    useEffect(() => {
        dispatch(clearMessage())
        const token = localStorage.getItem(LOCAL_STORAGE_NAME);
        if (token) {
            dispatch(get_profile_info())
        }
    }, [])

    useEffect(() => {
        if (profileInfo?.picture) {
            setImagePreviewUrl(profileInfo.picture.url);
        }
    }, [profileInfo]);

    useEffect(() => {
        switch (currentPageName) {
            case '/user/myurls':
                setActiveMenu('/user/myurls');
                break;
            case '/user/create_url':
                setActiveMenu('/user/create_url');
                break;
            case '/user/profile':
                setActiveMenu('/user/profile');
                break;
            case '/user/login':
                setActiveMenu('/user/login');
                break;
            case '/user/register':
                setActiveMenu('/user/register');
                break;
            default:
                break;
        }
    }, [currentPageName]);

    const handleLogOut = () => {
        dispatch(closeMenu())
        localStorage.removeItem(LOCAL_STORAGE_NAME)
        navigate('/user/login');
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
            token ?
                //! private navbar
                <>
                    {
                        loading && <div className={s.line_container}>
                            <div className={s.moving_gradient}></div>
                        </div>
                    }

                    <nav className={s.nav}>
                        <div className={s.nav_container}>
                            <div className={s.title_image}>
                                <Link to="/user/profile" className={s.image_anchor}>
                                    <img src={imagePreviewUrl} className={s.img} />
                                </Link>
                                <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                            </div>
                            <div className={s.searchbarandmenu}>
                                <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />
                                <FontAwesomeIcon icon={faBars} className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                            </div>
                            <div className={s.menuitems_expanded}  >
                                <Link to="/user/myurls" className={`${s.button} ${activeMenu === '/user/myurls' ? s.active : ''}`} >My urls</Link>
                                <Link to="/user/create_url" className={`${s.button} ${activeMenu === '/user/create_url' ? s.active : ''}`} >Create url</Link>
                                <Link to="/user/profile" className={`${s.button} ${activeMenu === '/user/profile' ? s.active : ''}`} >Profile</Link>
                                <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
                            </div>
                        </div>
                    </nav>
                    {menu &&
                        <div className={s.menuitems_collapse}>
                            <Link to="/user/myurls" className={`${s.button} ${activeMenu === '/user/myurls' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>My urls</Link>
                            <Link to="/user/create_url" className={`${s.button} ${activeMenu === '/user/create_url' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Create url</Link>
                            <Link to="/user/profile" className={`${s.button} ${activeMenu === '/user/profile' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Profile</Link>
                            <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
                        </div>
                    }
                    {
                        searchedByKeywordValues.length > 0 && !isInputHidden &&
                        <div className={s.keywords_wrapper}>
                            <div className={s.keywords_container}>
                                {searchedByKeywordValues.map((item) => {
                                    return <p className={s.keyword} key={item._id} onClick={() => { keywordClickedHandler(item.name) }}>{item.name}</p>
                                })}
                            </div>
                        </div>
                    }


                </>
                :
                //! public navbar
                <>
                    {loading && <div className={s.line_container}>
                        <div className={s.moving_gradient}></div>
                    </div>}
                    <nav className={s.nav}>
                        <div className={s.nav_container}>
                            <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>

                            <div className={s.searchbarandmenu}>
                                <Searchbar searchKeywordHandler={searchKeywordHandler} setIsInputHidden={setIsInputHidden} />
                                <FontAwesomeIcon icon={faBars} className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                            </div>
                            <div className={s.menuitems_expanded}>
                                <Link to="/user/login" className={`${s.button} ${activeMenu === '/user/login' ? s.active : ''}`}>Log In</Link>
                                <Link to='/user/register' className={`${s.button} ${s.bold_button} ${s.bold_button} ${activeMenu === '/user/register' ? s.active : ''}`}>Get Started</Link>
                            </div>
                        </div>
                    </nav>
                    {menu &&
                        <div className={s.menuitems_collapse}>
                            <Link to="/user/login" className={`${s.button} ${activeMenu === '/user/login' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Log In</Link>
                            <Link to='/user/register' className={`${s.button} ${s.bold_button} ${activeMenu === '/user/register' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Get Started</Link>
                        </div>
                    }
                    {
                        searchedByKeywordValues.length > 0 && !isInputHidden &&
                        <div className={s.keywords_wrapper}>
                            <div className={s.keywords_container}>
                                {searchedByKeywordValues.map((item) => {
                                    return <p className={s.keyword} key={item._id} onClick={() => { keywordClickedHandler(item.name) }}>{item.name}</p>
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
