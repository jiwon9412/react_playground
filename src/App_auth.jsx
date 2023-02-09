import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/auth/home';
import Info from './components/auth/info';
import Join from './components/auth/join';
import Login from './components/auth/login';
import Root from './components/auth/root';

const App_auth = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App_auth;
