import React from 'react';
import { Container } from "@mui/material";
import Header from "./components/pageLayout/Header";
import LoadData from "./components/LoadData";
import Footer from "./components/pageLayout/Footer";
import DetailPage from "./pages/DetailPage";
import Custom404 from "./pages/Custom404";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

const App = () => {

  return (
    <div className="App">
      <Header/>
        <Container>
          <LoadData/>
            <Routes>
              <Route path={"/"} element={<Main/>}/>
              <Route path={"/detail/:id"} element={<DetailPage/>}/>
              <Route path='*' element={<Custom404/>}/>
            </Routes>
        </Container>
      <Footer/>
    </div>
  );
}

export default App;
