import React from 'react';
import { Route } from "react-router-dom";
import Login from './Login';
import Mainpage from './Main';
  function NavigationDemo() {

  return (
   <div>
    <Route path="/" component={Login} exact />
    <Route path="/dashboard" component={Mainpage} exact />
   </div>
  );
}
export default NavigationDemo; 
