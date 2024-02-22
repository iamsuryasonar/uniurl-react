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
            <div className='relative bg-slate-50 max-w-5xl w-full m-auto overflow-hidden'>
                <div className='min-h-svh max-w-md px-4 w-full m-auto ' onClick={onClickHandler}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NavbarLayout;