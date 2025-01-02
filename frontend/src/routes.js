import { lazy } from "react";
const GoogleLogInPage = lazy(() => import('./app/pages/googleLogin/GoogleLogInPage'));
const HeroPage = lazy(() => import('./app/pages/hero/HeroPage'));
const ProfilePage = lazy(() => import('./app/pages/profile/ProfilePage'));
const LogInPage = lazy(() => import('./app/pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./app/pages/register/RegisterPage'));
const MyUrlsPage = lazy(() => import('./app/pages/myUrls/MyUrlsPage'));

export const privateRoutes = [
    {
        path: "/user/profile",
        element: <ProfilePage />,
    },
    {
        path: "/user/myurls",
        element: <MyUrlsPage />,
    }
];

export const publicRoutes = [
    {
        path: "/",
        element: <HeroPage />,
    },
    {
        path: "/user/login",
        element: <LogInPage />,
    },
    {
        path: "/user/google_login",
        element: <GoogleLogInPage />,
    },
    {
        path: "/user/register",
        element: <RegisterPage />,
    },
    // {
    //     path: "*",
    //     element: <NotFound />,
    // },
];