import './App.css';
import WelcomePage from './app/pages/welcome/Welcome_page'
import LogInPage from './app/pages/login/Login_page'
import RegisterPage from './app/pages/register/Register_page'
import React, { useEffect, useState } from 'react';
import { Redirect, BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NotFoundPage from './app/pages/notFound/Notfound_page'
import ProfilePage from './app/pages/profile/Profile_page';
import NavbarLayout from './app/components/navbarAndContentLayout/navbar_layout';
import PrivateRoute from './app/components/private_route';
import PublicRoute from './app/components/authGuard'
import CreateUrl from './app/pages/createUrl/Create_url'
import MyUrlPage from './app/pages/myUrls/My_urls_page'
import UrlsPage from './app/pages/urls/Urls_page'

function App() {

  return (
    <>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/user/login"
            element={
              <PublicRoute>
                <LogInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/user/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/:username"
            element={
              <UrlsPage />
            }
          />
          <Route
            path="/user/myurls"
            element={
              <PrivateRoute>
                <MyUrlPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/createurl"
            element={
              <PrivateRoute>
                <CreateUrl />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
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


