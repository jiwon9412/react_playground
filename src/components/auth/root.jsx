import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
