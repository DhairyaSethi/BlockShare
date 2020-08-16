import React, {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Main from './components/Main'

function App() {
  const [name, setName] = useState()
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
                {name? name: ''}
              </li>
            </ul>
          </div>
        </div>
      </nav>

     <Main setName={setName}/>
   
     
      
    </div></Router>
  );
}

export default App;
