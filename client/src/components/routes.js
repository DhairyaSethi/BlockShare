import React from 'react';
 import { Link, Route } from "react-router-dom";
import Login from './Login';
import Mainpage from './mainpage';
  function NavigationDemo() {

  return (
   <div>
   <Route path="/" component={Login} exact />
   <Route path="/dashboard" component={Mainpage} exact />
   
  
   </div>
  );
}
export default NavigationDemo; 

//<Link component={Log} to={{pathname: '/log'}}>NavigateNow</Link>