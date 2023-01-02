import React from "react";
import styled from "styled-components";

const Movie = ({ movie }) => {
  return (
    <MovieBox>
      <h2>{movie?.name}</h2>
      <p>{movie?.content}</p>
    </MovieBox>
  );
};

export default Movie;

const MovieBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 75%;
  padding: 2em 2em;
  border-radius: 2em;
  background-color: #250d49;
  margin: 1em 0;

  h2 {
    color: #f0ff00;
  }

  p {
    color: #fff;
  }
`;
