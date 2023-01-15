import React from "react";
import styled from "styled-components";

const Join = () => {
  return (
    <JoinBox>
      <p>Your ID</p>
      <input type='text' />
      <p>Password</p>
      <input type='text' />
      <BottomBox>
        <button>Submit</button>
      </BottomBox>
    </JoinBox>
  );
};

export default Join;

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;

  p {
    font-weight: 700;
  }

  input {
    width: 300px;
    height: 25px;
    border-radius: 5px;
    outline: none;

    &:focus {
      background-color: #e3f6fe;
      border: 2px solid #2e596c;
    }
  }
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: flex-end;

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
