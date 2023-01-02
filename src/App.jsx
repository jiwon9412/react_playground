import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonBox from "./components/buttonBox";
import GlobalStyle from "./components/globalStyle";
import Movies from "./components/movies";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMoviesHandler();
  }, []);
  async function getMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();

      const newMovies = data.results.map((result) => {
        return {
          id: result.episode_id,
          name: result.title,
          content: result.opening_crawl,
        };
      });

      setMovies(newMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const clickHandler = () => {
    getMoviesHandler();
  };

  return (
    <>
      <MyApp>
        <GlobalStyle />
        <ButtonBox clickHandler={clickHandler} />
        {isLoading && <p>Loading ...</p>}
        {!isLoading && <Movies movies={movies} />}
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
