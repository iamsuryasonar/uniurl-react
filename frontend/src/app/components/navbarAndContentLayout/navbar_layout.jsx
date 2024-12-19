import { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../navbar/nav_bar';
import { closeMenu } from "../../store/slices/menuSlice";
import { useDispatch } from 'react-redux';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer'

function NavbarLayout() {
    const dispatch = useDispatch()
    const [isInputHidden, setIsInputHidden] = useState(false)
    const { message } = useSelector((state) => state.message);

    function onClickHandler() {
        dispatch(closeMenu());
        setIsInputHidden(true)
    }

    return (
        <>
            <NavBar isInputHidden={isInputHidden} setIsInputHidden={setIsInputHidden} />
            <div className='relative gradient_bg w-full m-auto overflow-hidden'>
                <div className='max-w-[1440px] px-4 w-full m-auto min-h-[calc(100svh-60px)] flex' onClick={onClickHandler}>
                    <Outlet />
                </div>
            </div>
            <Message message={message} />
            <Footer />
        </>
    )
}

export default NavbarLayout;