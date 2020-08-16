import React, { Component, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from "axios";
import { render } from "react-dom";

    
class App extends Component { 
    constructor(props) {
        super(props);
        this.state = {
          username: "",
    
        };
    
      }

    handleClick = () => {
        this.props.history.push("/dashboard");
    }
    


    
 render() {
        return (
            <div className="Logincont">
            <div className="Loginin">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                    autoFocus
                    className="form-control"
                    id="firstname"
                    type="text"
                    placeholder="John Doe"
                    value={this.username}
                    onChange={username =>
                    this.setState({ username })}
                
                />
                </div>

                
            <button type="submit" className="btn btn-primary btn-block"
            onClick={this.handleClick}
            >Submit</button>
           
           
            </form> 
            </div>
            </div>
        );
        } 

 };
 export default App;