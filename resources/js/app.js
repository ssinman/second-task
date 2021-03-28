
require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Header from './components/header/';
import Main from './components/main/';
import Footer from './components/footer/';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Main/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
