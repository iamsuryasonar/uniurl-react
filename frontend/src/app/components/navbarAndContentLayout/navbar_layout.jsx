import { Outlet } from "react-router-dom";
import NavBar from '../navbar/nav_bar';
import s from './navbar_layout.module.css'
import { closeMenu } from "../../store/slices/menuSlice";
import { useDispatch } from 'react-redux'

function NavbarLayout() {
    const dispatch = useDispatch()

    return (
        <>
            <NavBar />
            <div className={ s.main_wrapper} onClick={() => dispatch(closeMenu())}>
                <Outlet />
            </div>
        </>
    )
}

export default NavbarLayout;