import React from "react";
import MyApp from "./components/MyApp";
import styled from "styled-components";
import GlobalStyle from "./components/globalStyle";
import Join from "./components/join";

const App_Join = () => {
  return (
    <MyApp>
      <GlobalStyle />
      <Join />
    </MyApp>
  );
};

export default App_Join;
