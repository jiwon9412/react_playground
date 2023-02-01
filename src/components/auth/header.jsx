import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <NavHeader>
      <nav>
        <StyleLink to="/">Home</StyleLink>
        <StyleLink to="login">Login</StyleLink>
        <StyleLink to="/">Logout</StyleLink>
      </nav>
    </NavHeader>
  );
};

export default Header;

const NavHeader = styled.section`
  height: 100px;
  padding-top: 10px;
  padding-right: 50px;

  nav {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyleLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: #000;
  font-size: 1.3em;

  &:hover {
    font-weight: 600;
    color: #53005e;
  }
`;
