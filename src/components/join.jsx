import React, { useState } from "react";
import styled from "styled-components";

const Join = () => {
  const [enteredId, setEnteredId] = useState("");
  const [enteredIdIsTouched, setEnteredIdIsTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordIsTouched, setEnteredPasswordIsTouched] =
    useState(false);

  const enteredIdIsValid = enteredId.length >= 6; //Id 8자리 이상인지 유효성검사
  /**
   *
   * @param {*} password //입력한 password
   * @returns boolean : password 유효성검사결과
   */
  const checkValidationPassword = (password) => {
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

  const enteredPasswordIsValid = checkValidationPassword(enteredPassword); //Password 유효성검사 (8자이상, 특수문자 포함)

  const handleIdChange = (e) => {
    setEnteredId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!enteredIdIsValid) {
      alert("ID를 확인하세요.");
      return;
    }
    if (!enteredPasswordIsValid) {
      alert("Password를 확인하세요.");
      return;
    }

    alert(`ID : ${enteredId} \n Password : ${enteredPassword}`);
  };

  const handleIdInputBlur = () => {
    setEnteredIdIsTouched(true);
  };

  const handlePasswordInputBlur = () => {
    setEnteredPasswordIsTouched(true);
  };

  return (
    <JoinBox>
      <p>Your ID</p>
      <JoinInput
        type='text'
        onChange={handleIdChange}
        onBlur={handleIdInputBlur}
        validation={enteredIdIsValid || !enteredIdIsTouched}
      />
      {!enteredIdIsValid && enteredIdIsTouched && (
        <WarningText>ID는 6자리 이상만 가능합니다.</WarningText>
      )}
      <p>Password</p>
      <JoinInput
        type='password'
        onChange={handlePasswordChange}
        onBlur={handlePasswordInputBlur}
        validation={enteredPasswordIsValid || !enteredPasswordIsTouched}
      />
      {!enteredPasswordIsValid && enteredPasswordIsTouched && (
        <WarningText>
          Password는 8자이상이고 특수문자를 포함하여야합니다.
        </WarningText>
      )}
      <BottomBox>
        <button onClick={handleSubmit}>Submit</button>
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
