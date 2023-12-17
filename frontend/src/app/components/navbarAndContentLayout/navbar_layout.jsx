import react, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../navbar/nav_bar';
import s from './navbar_layout.module.css'
import { closeMenu } from "../../store/slices/menuSlice";
import { useDispatch } from 'react-redux'
import Footer from '../Footer/Footer'

function NavbarLayout() {
    const dispatch = useDispatch()

    const [currentPageName, setCurrentPageName] = useState(window.location.pathname)
    const [isInputHidden, setIsInputHidden] = useState(false)

    function onClickHandler() {
        dispatch(closeMenu());
        setIsInputHidden(true)
    }

    return (
        <>
            <NavBar isInputHidden={isInputHidden} setIsInputHidden={setIsInputHidden} />
            <div className={s.main_wrapper} onClick={onClickHandler}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default NavbarLayout;