import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

function useLocationPathname() {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState();

    useEffect(() => {
        switch (location.pathname) {
            case '/user/myurls':
                setActiveMenu('myurls');
                break;
            case '/user/create_url':
                setActiveMenu('create_url');
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
    }, [location.pathname]);

    return [activeMenu];
}

export default useLocationPathname;