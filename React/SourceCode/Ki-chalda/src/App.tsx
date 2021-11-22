


import React from "react";
import RouteLogin from "./containers/Route/RouteLogin";
import { BrowserRouter } from "react-router-dom";
import dotenv from 'dotenv';



function App() {
  dotenv.config();

  //console.log("Version No", process.env.REACT_APP_VERSION_NUMBER);
  return (
    <BrowserRouter>
     
      <RouteLogin />
    </BrowserRouter>
  );
}

export default App;
