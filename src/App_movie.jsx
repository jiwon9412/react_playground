import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AddMovie from "./components/addMovie";
import ButtonBox from "./components/buttonBox";
import DownCount from "./components/downCount";
import GlobalStyle from "./components/globalStyle";
import Movies from "./components/movies";
import UpCount from "./components/upCount";
import useHttp from "./hooks/useHttp";

const App = () => {
  const [movies, setMovies] = useState([]);
  const firebaseUrl = process.env.REACT_APP_FIREBASE_URL;

  const { isLoading, error, sendRequest: getMoviesHandler } = useHttp();
  const {
    isLoading: postLoading,
    error: postError,
    sendRequest: addMovieHandler,
  } = useHttp();
  const getMoviesTrigger = useCallback(() => {
    const transformMovies = (data) => {
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
    };

    getMoviesHandler({ url: `${firebaseUrl}/movies.json` }, transformMovies);
  }, [getMoviesHandler]);

  useEffect(() => {
    getMoviesTrigger();
  }, [getMoviesTrigger]);

  const addMovieTrigger = (newMovie) => {
    addMovieHandler({
      url: `${firebaseUrl}/movies.json`,
      method: "POST",
      body: newMovie,
      header: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <MyApp>
        <GlobalStyle />
        <AddMovie addMovieHandler={addMovieTrigger} />
        <ButtonBox clickHandler={getMoviesTrigger} />
        {!isLoading && movies.length > 0 && <Movies data={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no Movies..</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading ...</p>}
        {/* <UpCount />
        <DownCount /> */}
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
