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

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentPageName = window.location.pathname;

    const token = localStorage.getItem(LOCAL_STORAGE_NAME)

    const menu = useSelector(state => state.menu.value);
    const { loading } = useSelector((state) => state.loading);

    const [activeMenu, setActiveMenu] = useState(currentPageName);

    const profileInfo = useSelector(state => state.profile.profileInfo)
    const [imagePreviewUrl, setImagePreviewUrl] = useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true')

    useEffect(() => {
        if (!profileInfo) {
            dispatch(get_profile_info())
        }
        if (profileInfo?.picture) {
            const dataURL = `data:image/png;base64,${profileInfo.picture}`;
            setImagePreviewUrl(dataURL);
        }
        // if (profileInfo?.name) {
        //     setName(profileInfo.name);
        // }
    }, [profileInfo]);

    useEffect(() => {
        switch (currentPageName) {
            case '/user/myurls':
                setActiveMenu('/user/myurls');
                break;
            case '/user/createurl':
                setActiveMenu('/user/createurl');
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
    console.log(activeMenu)

    return <>
        {
            token ?
                //! private navbar
                <>
                    {loading && <div className={s.line_container}>
                        <div className={s.moving_gradient}></div>
                    </div>}
                    <nav className={s.nav}>
                        <div className={s.title_image}>
                            <img src={imagePreviewUrl} className={s.img} />
                            <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                        </div>
                        <div className={s.menuitems_expanded}  >
                            <Link to="/user/myurls" className={`${s.button} ${activeMenu === '/user/myurls' ? s.active : ''}`} >My urls</Link>
                            <Link to="/user/createurl" className={`${s.button} ${activeMenu === '/user/createurl' ? s.active : ''}`} >Create url</Link>
                            <Link to="/user/profile" className={`${s.button} ${activeMenu === '/user/profile' ? s.active : ''}`} >Profile</Link>
                            <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
                        </div>
                        <div className={s.searchbarandmenu}>
                            <Searchbar />
                            <FontAwesomeIcon icon={faBars} className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                        </div>
                    </nav>
                    {menu &&
                        <div className={s.menuitems_collapse}>
                            <Link to="/user/myurls" className={`${s.button} ${activeMenu === '/user/myurls' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>My urls</Link>
                            <Link to="/user/createurl" className={`${s.button} ${activeMenu === '/user/createurl' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Create url</Link>
                            <Link to="/user/profile" className={`${s.button} ${activeMenu === '/user/profile' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Profile</Link>
                            <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
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
                        <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                        <div className={s.menuitems_expanded}>
                            <Link to="/user/login" className={`${s.button} ${activeMenu === '/user/login' ? s.active : ''}`}>Log In</Link>
                            <Link to='/user/register' className={`${s.button} ${s.bold_button} ${s.bold_button} ${activeMenu === '/user/register' ? s.active : ''}`}>Get Started</Link>
                        </div>
                        <div className={s.searchbarandmenu}>
                            <Searchbar />
                            <FontAwesomeIcon icon={faBars} className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                        </div>
                    </nav>
                    {menu &&
                        <div className={s.menuitems_collapse}>
                            <Link to="/user/login" className={`${s.button} ${activeMenu === '/user/login' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Log In</Link>
                            <Link to='/user/register' className={`${s.button} ${s.bold_button} ${activeMenu === '/user/register' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Get Started</Link>
                        </div>
                    }
                </>
        }
    </>;
};

export default NavBar;
