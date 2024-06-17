import react, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../navbar/nav_bar';
import { closeMenu } from "../../store/slices/menuSlice";
import { useDispatch } from 'react-redux'
import Footer from '../Footer/Footer'

function NavbarLayout() {
    const dispatch = useDispatch()
    const [isInputHidden, setIsInputHidden] = useState(false)

    function onClickHandler() {
        dispatch(closeMenu());
        setIsInputHidden(true)
    }

    return (
        <>
            <NavBar isInputHidden={isInputHidden} setIsInputHidden={setIsInputHidden} />
            <div className='relative gradient_bg w-full m-auto overflow-hidden'>
                <div className='max-w-[1440px] px-4 w-full m-auto min-h-svh flex' onClick={onClickHandler}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NavbarLayout;