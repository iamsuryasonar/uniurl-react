import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.services';
import { useDispatch } from 'react-redux';
import { setMessage } from '../store/slices/messageSlice';

function GoogleLogInPage() {

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (code) {
    (async () => {
      const res = await AuthService.googleLogin({ code: code });
      if (res.status === 200) {
        navigate(0);
      } else {
        dispatch(setMessage('Login failed, please try again!'))
        navigate('/user/login');
      }
    })();
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center text-white text-3xl font-bold animate-pulse'>Authenticating please wait...</div>
  )
}

export default GoogleLogInPage