import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';


import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS 추가
import { Router, json } from 'react-router-dom';
import { getmyInfo } from './features/main/mainSlice';
// import 'react-toastify/dist/ReactToastify.min.css'; // ReactToastify CSS 추가


(()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user);
  if(!user) return;
  store.dispatch(getmyInfo(user));
})();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>

);

reportWebVitals();
