import React, {useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Fileupload from './fileupload';
import QRCode from 'qrcode.react';
import UserActivity from './UserActivity'
import {w3cwebsocket} from 'websocket';
import Peer from 'peerjs'

let peer, conn;
let clients = {};
const ws = new w3cwebsocket('ws://127.0.0.1:8000')
const types = {
    NEW_PEER_FOUND: 'newpeer',
    WELCOME: 'welcome',
    RECIEVE_FILE: 'filerecieve',
    SENT_FILE: 'filesend',
    USER_ACTIVITY_LOG: 'log',
    NEW_USER: 'newUser'

}

function Main (props) { 
    const [username, setUsername] = useState()
    const [sendModal, setSendModal] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userActivity, setUserActivity] = useState([])
    const [peerId, setPeerId] = useState()
    const [otherId, setOtherId] = useState()
    const [file, setFile] = useState()

    const handleClick = () => {
        props.history.push("/dashboard");
    }
 
    // useEffect(() => {
    //     if(!username) return
    //         ws.send(JSON.stringify({
    //             type: types.NEW_USER,
    //             id: username
    //         }))
    // }, [username])

    useEffect(() => {
        ws.onmessage = _msg => {
            let msg = JSON.parse(_msg.data)
            console.log('message recieved =>', msg)
      
            switch(msg.type) {

              case types.NEW_PEER_FOUND:
                setOtherId(msg.peerId)
                console.log('Other Peer found ', otherId)
                break;
      
              case types.USER_ACTIVITY_LOG:
                // setUserActivity(userActivity => [...userActivity, msg.userActivity])
                setUserActivity(msg.userActivity)
                break;
            }
        }
    }, [])

    useEffect(() => {
        if(peerId) openPeer()

    }, [peerId])

    const openPeer =  () => {
        peer = new Peer(peerId
        ,{
          host: 'localhost',
          port: 9000,
          path: '/',
          debug: 3
        }
        )
    }


    const onUpload = () => {
        if(!file) return
        if(!file.type) {
            alert('File type not recognized! Please try again.')
            return
        }
        // const blob = new File([file], { type: file.type })
        // const url = URL.createObjectURL(blob)
        conn = peer.connect('rec')
        conn.on('open', () => {
            console.log(`[+] Sending ${file}`)
            conn.send({file: file, type: file.type, name: file.name})
        })
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
    {!sendModal ? 
        <button type="submit" className="btn btn-primary btn-block" onClick={() => {setPeerId('sen'); setSendModal(true);}}> Send </button>
        :
        <div>
        <input type='file' onChange={e=> setFile(e.target.files[0])} />
        {file ? <button onClick={onUpload}> Share! </button> : ''}
        </div>
    }
    <Fileupload />
    </div>
    <div className="auth-inn">
    <form>
        <h3>Receive</h3>
    </form> 
        <button type="submit" className="btn btn-primary btn-block" onClick={() => setPeerId('rec')}> Receive </button>
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