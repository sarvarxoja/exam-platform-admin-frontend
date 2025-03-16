import React from 'react';
import ReactDOM from 'react-dom/client';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// google-fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

// project import
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
axios.defaults.baseURL = 'http://localhost:2310';
axios.defaults.withCredentials = true;
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

window.addEventListener('storage', () => {
  const newToken = localStorage.getItem('token');
  if (newToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER ||============================== //

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
