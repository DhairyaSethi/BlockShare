import React, {useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Fileupload from './fileupload';
import QRCode from 'qrcode.react';
import UserActivity from './UserActivity'
import Peer from 'peerjs'
    
function Main (props) { 
    const [username, setUsername] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [userActivity, setUserActivity] = useState([])

    const handleClick = () => {
        props.history.push("/dashboard");
    }
 
    
    const Login = () => (
        <div className="Logincont">
        <div className="Loginin">
        <form>
            <h3>Start Sharing</h3>
            <div className="form-group">
                <label>What should others call you?</label>
                <input 
                autoFocus
                className="form-control"
                id="firstname"
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            </div> 
        <button type="submit" className="btn btn-primary btn-block"
        onClick={() => setLoggedIn(true)}>Submit</button>       
        </form> 
        </div>
        </div>
    )





if(!loggedIn) return <Login />
else 
return (
    <div className="auth-wrapper">
    <div className="auth-inner">
    <form>
        <h3>Send</h3>

    </form> 
    <Fileupload />
    <button type="submit" className="btn btn-primary btn-block"
    onClick={handleClick}
    >Send</button>
    </div>
    <div className="auth-inn">
    <form>
        <h3>Receive</h3>
    </form> 
        <button type="submit" className="btn btn-primary btn-block"
        onClick={handleClick}
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
    <UserActivity userActivity={userActivity} />
    </div>
    </div>
    </div>
);
    
    
 };
 export default Main;