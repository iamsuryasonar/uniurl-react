import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import PrivateRoute from './app/components/guards/PrivateRoute';
import PublicRoute from './app/components/guards/PublicRoute'
import NavbarLayout from './app/components/navbarAndContentLayout/NavbarLayout';
import GoogleLogInPage from './app/pages/googleLogin/GoogleLogInPage';
const HeroPage = lazy(() => import('./app/pages/hero/HeroPage'));
const ProfilePage = lazy(() => import('./app/pages/profile/ProfilePage'));
const LogInPage = lazy(() => import('./app/pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./app/pages/register/RegisterPage'));
const CreateUrl = lazy(() => import('./app/pages/createUrl/CreateUrlPage'));
const MyUrlPage = lazy(() => import('./app/pages/myUrls/MyUrlsPage'));
const UrlsPage = lazy(() => import('./app/pages/urls/UrlsPage'));

function App() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90svh',
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
                  <HeroPage />
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
            path="/user/google_login"
            element={
              <PublicRoute>
                <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
                  <GoogleLogInPage />
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
            path="/user/create_url"
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
        <Route
          path="/:username"
          element={
            <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
              <UrlsPage />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<NotFoundPage />}  */}
      </Routes>
    </>
  );
}

export default App;


