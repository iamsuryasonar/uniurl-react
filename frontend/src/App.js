import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { privateRoutes, publicRoutes } from './routes';

import NavbarLayout from './app/components/navbarAndContentLayout/NavbarLayout';
import PrivateRoute from './app/components/guards/PrivateRoute';
import PublicRoute from './app/components/guards/PublicRoute';
import UrlsPage from './app/pages/urls/UrlsPage';

function App() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    fontSize: '80px',
    backgroundColor: 'white',
    color: 'white',
  };

  return (
    <>
      <Routes>
        <Route element={
          <Suspense fallback={<div style={centerStyle}><FontAwesomeIcon icon={faSpinner} spinPulse /></div>}>
            <NavbarLayout />
          </Suspense>
        }>
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
      </Routes >
    </>
  );
}

export default App;


