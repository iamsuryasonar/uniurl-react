import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import App from './App';
import { store } from './app/store/store';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, fas);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="317062420793-jf4ntalfn6cucob5klt42npdsmjijsm0.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
