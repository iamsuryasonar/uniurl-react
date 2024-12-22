import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { privateRoutes, publicRoutes } from './routes';

import NavbarLayout from './app/components/navbarAndContentLayout/NavbarLayout';
import PrivateRoute from './app/components/guards/PrivateRoute';
import PublicRoute from './app/components/guards/PublicRoute';

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
      <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
        <Routes>
          <Route element={<NavbarLayout />}>
            {
              privateRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={<PrivateRoute>{route.element}</PrivateRoute>} />
              })
            }
            {
              publicRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={<PublicRoute>{route.element}</PublicRoute>} />
              })
            }
          </Route>
          <Route
            path="/:username"
            element={
              <UrlsPage />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;


