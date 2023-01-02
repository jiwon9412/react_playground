import React from "react";
import styled from "styled-components";

const ButtonBox = ({ clickHandler }) => {
  return (
    <StyledButtonBox>
      <button onClick={clickHandler}>Fetch Movies</button>
    </StyledButtonBox>
  );
};

export default ButtonBox;

const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  padding: 2em 0;
  border-radius: 2em;
  background-color: #fff;
  margin-bottom: 1em;

  button {
    border-style: none;
    background-color: #250d49;
    color: #fff;
    padding: 0.8em 2em;
    border-radius: 1.5em;
    cursor: pointer;
  }
`;
