import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./page/StartPage";
import Game from "./page/Game";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path ="/game" element={<Game/>}/>  
      </Routes>
    </Router>
  );
};

export default App;
