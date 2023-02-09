import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import useInput from '../../hooks/useInput';
import AuthContext from '../../store/auth-context';

const Info = () => {
  const [showPasswordChanger, setShowPasswordChanger] = useState(false);

  const { isLoading, error, sendRequest: changePassword } = useHttp();
  const authContext = useContext(AuthContext);

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
    value: newPassword,
    hasError: newPasswordHasError,
    handleInputChange: handlePasswordInputChange,
    handleInputBlur: handlePasswordInputBlur,
    resetValue: resetPassword,
  } = useInput(checkEnteredPassword);

  const handleClick = () => {
    if (newPasswordHasError) {
      alert('Password를 확인하세요!');
      return;
    }

    const changePasswordRequestconfig = {
      url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_AUTH_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        idToken: authContext.token,
        password: newPassword,
        returnSecureToken: false,
      },
    };

    changePassword(changePasswordRequestconfig, resetPassword);
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowPasswordChanger(true);
        }}
      >
        비밀번호 변경
      </Button>
      {showPasswordChanger && (
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePasswordInputChange}
          onBlur={handlePasswordInputBlur}
          validation={!newPasswordHasError}
          value={newPassword || ''}
        />
      )}
      <Button onClick={handleClick}>변경!</Button>
    </>
  );
};

export default Info;

const Button = styled.button`
  width: 100px;
  height: 35px;
  border-style: none;
  background-color: #052aff;
  color: #fff;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
`;

const Input = styled.input`
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
