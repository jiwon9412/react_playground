import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';

const Header = () => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
    console.log(authContext.token);
  };

  return (
    <NavHeader>
      <nav>
        <StyleLink to="/">Home</StyleLink>
        {isLoggedIn || <StyleLink to="login">Login</StyleLink>}
        {isLoggedIn && (
          <StyleLink to="/login" onClick={logoutHandler}>
            Logout
          </StyleLink>
        )}
        {isLoggedIn && (
          <StyleLink to="/info" my={true}>
            My
          </StyleLink>
        )}
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
  color: ${(props) => (props.my ? '#052aff' : '#000')};
  font-size: 1.3em;

  &:hover {
    font-weight: 600;
    color: #53005e;
  }
`;
