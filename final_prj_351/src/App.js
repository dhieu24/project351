// import logo from './logo.svg';
import React, { Suspense, useEffect, useState, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('./components/Login/login'))
const Signup = lazy(() => import('./components/SignUp/signup'))
const Home = lazy(() => import('./components/Home/home'))

function App() {
  return (
    <div className="App">
      <BrowserRouter fallback={<div>Loading</div>}>
        <Routes>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="*" element={<div>404 Page</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
