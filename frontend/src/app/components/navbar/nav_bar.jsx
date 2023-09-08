import React, { useState, useEffect } from 'react';
import s from './nav_bar.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../searchbar/searchbar'
import { APP_NAME, LOCAL_STORAGE_NAME } from '../../common/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleMenu, closeMenu } from '../../store/slices/menuSlice'

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menu = useSelector(state => state.menu.value);

    const token = localStorage.getItem(LOCAL_STORAGE_NAME)
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const currentPageName = window.location.pathname;
        switch (currentPageName) {
            case '/user/myurls':
                setActiveMenu('myurls');
                break;
            case '/user/createurl':
                setActiveMenu('createurl');
                break;
            case '/user/profile':
                setActiveMenu('profile');
                break;
            case '/user/login':
                setActiveMenu('login');
                break;
            case '/user/register':
                setActiveMenu('register');
                break;
            default:
                break;
        }
    },);

    const handleLogOut = () => {
        dispatch(closeMenu())
        localStorage.removeItem(LOCAL_STORAGE_NAME)
        navigate('/user/login');
    }

    const PrivateNav = () => (
        <>
            <div class={s.line_container}>
                <div class={s.moving_gradient}></div>
            </div>
            <nav className={s.nav}>
                <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                <div className={s.menuitems_expanded}  >
                    <Link to="/user/myurls" className={`${s.button} ${activeMenu === 'myurls' ? s.active : ''}`} >My urls</Link>
                    <Link to="/user/createurl" className={`${s.button} ${activeMenu === 'createurl' ? s.active : ''}`} >Create url</Link>
                    <Link to="/user/profile" className={`${s.button} ${activeMenu === 'profile' ? s.active : ''}`} >Profile</Link>
                    <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
                </div>
                <div className={s.searchbarandmenu}>
                    <Searchbar />
                    <FontAwesomeIcon icon='fa-solid fa-bars' className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                </div>
            </nav>
            {menu &&
                <div className={s.menuitems_collapse}>
                    <Link to="/user/myurls" className={`${s.button} ${activeMenu === 'myurls' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>My urls</Link>
                    <Link to="/user/createurl" className={`${s.button} ${activeMenu === 'createurl' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Create url</Link>
                    <Link to="/user/profile" className={`${s.button} ${activeMenu === 'profile' ? s.active : ''}`} onClick={() => dispatch(closeMenu())}>Profile</Link>
                    <div className={`${s.button} ${s.bold_button}`} onClick={handleLogOut}>Log out</div>
                </div>
            }
        </>
    );

    const PublicNav = () => (
        <>
            <nav className={s.nav}>
                <Link to="/" className={s.nav_title} onClick={() => dispatch(closeMenu())}>{APP_NAME}</Link>
                <div className={s.menuitems_expanded}>
                    <Link to="/user/login" className={`${s.button} ${activeMenu === 'login' ? s.active : ''}`}>Log In</Link>
                    <Link to='/user/register' className={`${s.button} ${s.bold_button} ${s.bold_button} ${activeMenu === 'register' ? s.active : ''}`}>Get Started</Link>
                </div>
                <div className={s.searchbarandmenu}>
                    <Searchbar />
                    <FontAwesomeIcon icon='fa-solid fa-bars' className={s.menuicon} onClick={() => dispatch(toggleMenu())} />
                </div>
            </nav>
            {menu &&
                <div className={s.menuitems_collapse}>
                    <Link to="/user/login" className={`${s.button} ${activeMenu === 'login' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Log In</Link>
                    <Link to='/user/register' className={`${s.button} ${s.bold_button} ${activeMenu === 'register' ? s.active : ''}`} onClick={() => dispatch(closeMenu())} >Get Started</Link>
                </div>
            }
        </>
    );

    return <> {token ? <PrivateNav /> : <PublicNav />}</>;
};

export default NavBar;
