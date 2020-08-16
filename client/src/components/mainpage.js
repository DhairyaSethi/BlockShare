import React, { Component, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Fileupload from './fileupload';
import axios from "axios";
import QRCode from 'qrcode.react';
import Test from './getapi';
import { Link } from "react-router-dom";
// import { useHistory, withRouter } from 'react-router-dom';
    
class App extends Component { 
    //  history = useHistory();

     handleClick = () => {
        this.props.history.push("/dashboard");
    }
 
    

    
      render(){
        return (

            <div className="auth-wrapper">
            <div className="auth-inner">
            <form>
                <h3>Send</h3>

            </form> 
            <Fileupload />
           
          
            <button type="submit" className="btn btn-primary btn-block"
            onClick={this.handleClick}
            >Send</button>
            </div>
            <div className="auth-inn">
            <form>
                <h3>Receive</h3>

            </form> 
            
       
           
             <button type="submit" className="btn btn-primary btn-block"
            onClick={this.handleClick}
            >Receive</button>
            
            </div>
            <div className="qrcode">
            <form>
                <h3>Scan Qr Code</h3>

            </form> 
            
            <QRCode  value="http://facebook.github.io/react/" />
            <br />
            <br />
            <br />
           
            
            </div>

            <div className ='lowercont'>
            <div className='lowerin'>
            <Test />
            </div>
            </div>
         
            </div>
        );
    
        }
 };
 export default (App);