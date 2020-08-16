import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from './components/Main'

import Login from "./components/routes";
import SignUp from "./components/signup.component";
import Fileupload from './components/fileupload';
function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={"/"}>BlockShare</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
               
              </li>
              <li className="nav-item">
               
              </li>
            </ul>
          </div>
        </div>
      </nav>

     <Main />
   
     
      
    </div></Router>
  );
}

export default App;
