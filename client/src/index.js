import React from "react";
import ReactDOM from "react-dom";
import {Route, IndexRoute} from 'react-router';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <App />
      
    
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();