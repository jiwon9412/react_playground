import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/auth-context';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  padding: 20px;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin: 10px 0;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    margin-left: 5px;
  }
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: lightblue;
  color: white;
  cursor: pointer;
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const { isLoading, error, sendRequest: fetchLogin } = useHttp();

  const idChangeHandler = (e) => {
    setId(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const callbackLogin = (data) => {
    //console.log(data);
    authContext.login(data.idToken);
    setId('');
    setPassword('');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(id);
    // console.log(password);
    const loginRequestConfig = {
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: id,
        password: password,
        returnSecureToken: true,
      },
    };
    fetchLogin(loginRequestConfig, callbackLogin);
  };

  const goSignPage = () => {
    navigate('/join');
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          value={id}
          onChange={idChangeHandler}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />

        <ButtonBox>
          <Button type="button" onClick={goSignPage}>
            Sing In
          </Button>
          <Button type="submit">Login</Button>
        </ButtonBox>
      </LoginForm>
    </Container>
  );
};

export default Login;
