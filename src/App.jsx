import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AddMovie from "./components/addMovie";
import ButtonBox from "./components/buttonBox";
import DownCount from "./components/downCount";
import GlobalStyle from "./components/globalStyle";
import Movies from "./components/movies";
import UpCount from "./components/upCount";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const firebaseUrl = process.env.REACT_APP_FIREBASE_URL;

  useEffect(() => {
    getMoviesHandler();
  }, []);
  async function getMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch(`${firebaseUrl}/movies.json`);
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: data[key].id,
          title: data[key].title,
          content: data[key].content,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const clickHandler = () => {
    getMoviesHandler();
  };

  async function addMovieHandler(newMovie) {
    try {
      const response = await fetch(`${firebaseUrl}/movies.json`, {
        method: "POST",
        body: JSON.stringify(newMovie),
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MyApp>
        <GlobalStyle />
        <AddMovie addMovieHandler={addMovieHandler} />
        <ButtonBox clickHandler={clickHandler} />
        {isLoading && <p>Loading ...</p>}
        {!isLoading && <Movies data={movies} />}
        <UpCount />
        <DownCount />
      </MyApp>
    </>
  );
};

export default App;

const MyApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;
`;
