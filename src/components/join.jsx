import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Join = () => {
  const checkEnteredId = (id) => {
    return id.length >= 6;
  };

  const {
    value: enteredId,
    hasError: enteredIdHasError,
    handleInputChange: handleIdInputChange,
    handleInputBlur: handleIdInputBlur,
    resetValue: resetId,
  } = useInput(checkEnteredId);

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
    value: enteredPassword,
    hasError: enteredPasswordHasError,
    handleInputChange: handlePasswordInputChange,
    handleInputBlur: handlePasswordInputBlur,
    resetValue: resetPassword,
  } = useInput(checkEnteredPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredIdHasError) {
      alert("ID를 확인하세요.");
      return;
    }
    if (enteredPasswordHasError) {
      alert("Password를 확인하세요.");
      return;
    }
    resetId();
    resetPassword();
    alert(`ID : ${enteredId} \n Password : ${enteredPassword}`);
  };

  return (
    <JoinBox>
      <p>아이디</p>
      <JoinInput
        type='text'
        onChange={handleIdInputChange}
        onBlur={handleIdInputBlur}
        validation={!enteredIdHasError}
        value={enteredId || ""}
      />
      {enteredIdHasError && (
        <WarningText>아이디는 6자리 이상만 가능합니다.</WarningText>
      )}
      <p>비밀번호</p>
      <JoinInput
        type='password'
        onChange={handlePasswordInputChange}
        onBlur={handlePasswordInputBlur}
        validation={!enteredPasswordHasError}
        value={enteredPassword || ""}
      />
      {enteredPasswordHasError && (
        <WarningText>
          비밀번호는 8자이상이고 특수문자를 포함하여야합니다.
        </WarningText>
      )}
      <BottomBox>
        <button onClick={handleSubmit}>회원가입</button>
      </BottomBox>
    </JoinBox>
  );
};

export default Join;

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;
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
  background-color: ${(props) => (props.validation ? "#fff" : "#FFCBCB")};
  border: 2px solid ${(props) => (props.validation ? "#000" : "#660000")};

  &:focus {
    background-color: #e3f6fe;
    border: 2px solid #2e596c;
  }
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    display: block;
    width: 100px;
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
