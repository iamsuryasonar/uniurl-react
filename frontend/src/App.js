import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import PrivateRoute from './app/components/private_route';
import PublicRoute from './app/components/authGuard'
import NavbarLayout from './app/components/navbarAndContentLayout/navbar_layout';
// import WelcomePage from './app/pages/welcome/Welcome_page'
// import LogInPage from './app/pages/login/Login_page'
// import RegisterPage from './app/pages/register/Register_page'
// import CreateUrl from './app/pages/createUrl/Create_url'
// import MyUrlPage from './app/pages/myUrls/My_urls_page'
// import UrlsPage from './app/pages/urls/Urls_page'
const WelcomePage = lazy(() => import('./app/pages/welcome/Welcome_page'));
const ProfilePage = lazy(() => import('./app/pages/profile/Profile_page'));
const LogInPage = lazy(() => import('./app/pages/login/Login_page'));
const RegisterPage = lazy(() => import('./app/pages/register/Register_page'));
const CreateUrl = lazy(() => import('./app/pages/createUrl/Create_url'));
const MyUrlPage = lazy(() => import('./app/pages/myUrls/My_urls_page'));
const UrlsPage = lazy(() => import('./app/pages/urls/Urls_page'));

function App() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    fontSize: '80px'
  };

  return (
    <>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <WelcomePage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/user/login"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <LogInPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/user/register"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <RegisterPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/:username"
            element={
              <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                <UrlsPage />
              </Suspense>
            }
          />
          <Route
            path="/user/myurls"
            element={
              <PrivateRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <MyUrlPage />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/createurl"
            element={
              <PrivateRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <CreateUrl />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <ProfilePage />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route path="*" element={<NotFoundPage />}  */}
      </Routes>
    </>
  );
}

export default App;


