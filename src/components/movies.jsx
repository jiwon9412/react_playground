import React from "react";
import styled from "styled-components";
import Movie from "./movie";

const Movies = ({ data }) => {
  return (
    <MoviesBox>
      {data.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </MoviesBox>
  );
};

export default Movies;

const MoviesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  padding: 3em 0;
  border-radius: 2em;
  background-color: #fff;
  margin-bottom: 2em;
`;
