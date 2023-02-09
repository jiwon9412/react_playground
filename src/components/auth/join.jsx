import React, { useState } from 'react';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import useInput from '../../hooks/useInput';

const Join = () => {
  const joinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_KEY}`;

  const checkEnteredId = (id) => {
    const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g;
    const idCheck = emailRegExp.test(id);
    return idCheck;
  };

  const checkEnteredPassword = (password) => {
    let checkLength = false;
    let checkIncludeSpecial = false;
    if (password.length >= 8) {
      checkLength = true;
    }
    const specialCharacterRegExp =
      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; //특수문자 정규표현식
    if (specialCharacterRegExp.test(password)) {
      checkIncludeSpecial = true;
    }

    return checkLength && checkIncludeSpecial;
  };

  const {
    value: enteredId,
    hasError: enteredIdHasError,
    handleInputChange: handleIdInputChange,
    handleInputBlur: handleIdInputBlur,
    resetValue: resetId,
  } = useInput(checkEnteredId);

  const {
    value: enteredPassword,
    hasError: enteredPasswordHasError,
    handleInputChange: handlePasswordInputChange,
    handleInputBlur: handlePasswordInputBlur,
    resetValue: resetPassword,
  } = useInput(checkEnteredPassword);

  const { isLoading, error, sendRequest: fetchJoin } = useHttp();

  const callbackLogin = () => {
    resetId();
    resetPassword();
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredIdHasError) {
      alert('ID를 확인하세요.');
      return;
    }
    if (enteredPasswordHasError) {
      alert('Password를 확인하세요.');
      return;
    }

    const joinRequestConfig = {
      url: joinUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: {
        email: enteredId,
        password: enteredPassword,
        returnSecureToken: true,
      },
    };

    fetchJoin(joinRequestConfig, callbackLogin);
  };

  return (
    <JoinBox>
      <JoinInput
        type="text"
        placeholder="Email"
        onChange={handleIdInputChange}
        onBlur={handleIdInputBlur}
        validation={!enteredIdHasError}
        value={enteredId || ''}
      />
      {enteredIdHasError && (
        <WarningText>아이디는 이메일 형식입니다.</WarningText>
      )}

      <JoinInput
        type="password"
        placeholder="Password"
        onChange={handlePasswordInputChange}
        onBlur={handlePasswordInputBlur}
        validation={!enteredPasswordHasError}
        value={enteredPassword || ''}
      />
      {enteredPasswordHasError && (
        <WarningText>
          비밀번호는 8자이상이고 특수문자를 포함하여야합니다.
        </WarningText>
      )}
      <BottonBox>
        <button onClick={handleSubmit}>Join</button>
      </BottonBox>
    </JoinBox>
  );
};

export default Join;

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-width: 460px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  p {
    font-weight: 700;
  }
`;

const JoinInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  outline: none;
  background-color: ${(props) => (props.validation ? '#fff' : '#FFCBCB')};
  border: 2px solid ${(props) => (props.validation ? '#ccc' : '#660000')};
  margin-bottom: ${(props) => (props.validation ? '20px' : '0px')};
  padding: 0 5px;

  &:focus {
    background-color: #e3f6fe;
    border: 2px solid #2e596c;
  }
`;

const BottonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  button {
    display: block;
    width: 310px;
    height: 30px;

    border-style: none;
    border-radius: 5px;
    background-color: #2eb6ff;
    color: #fff;

    cursor: pointer;
    &:hover {
      background-color: #0074ff;
      font-weight: 600;
    }
  }
`;

const WarningText = styled.p`
  padding: 0;

  color: #a00606;
  font-weight: 600;
  font-size: 0.7em;
`;
