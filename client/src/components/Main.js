import React, {useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import QRCode from 'qrcode.react';
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
    const [recModal, setRecModal] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userActivity, setUserActivity] = useState([])
    const [peerId, setPeerId] = useState()
    const [otherId, setOtherId] = useState()
    const [file, setFile] = useState()
    const [data, setData] = useState()
    const [metadata, setMetadata] = useState()
    const [url, setUrl] = useState()
    const [progessbar, setProgressbar] = useState({now: 0, text: ''})

 
    useEffect(() => {
        if(username){
            ws.send(JSON.stringify({
                type: types.NEW_USER,
                id: username
            }))
        props.setName(username)
        }
    }, [loggedIn])

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
                console.log(msg.userActivity)
                break;
            }
        }
    }, [])

    useEffect(() => {
        if(peerId) openPeer()
        if(peerId === 'rec') {
            setProgressbar({now: 10, text: 'Initializing'})
            peer.on('connection', connection => {
                console.log(`[+] New Peer ${connection.peer}\n Connected to Sender`)
                setProgressbar({now: 20, text: 'p2p Connection Active'})
                connection.on('data', dataRecieved => {
                    console.log('[+] Data recieved', dataRecieved)
                    setProgressbar({now: 40, text: 'Recieving'})
                    setData(dataRecieved.file)
                    setMetadata({name: dataRecieved.name, type: dataRecieved.type})
                    setProgressbar({now: 99, text: 'Recieved'})
                })
                conn = connection;
            })
        }

    }, [peerId])

    // useEffect(() => {
    //     if(file) setProgressbar({now: 99, text: 'Recieved'})
    // }, [file, metadata])
    

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
        ws.send(JSON.stringify({
            type: types.SENT_FILE,
            id: username
        }))
        // const blob = new File([file], { type: file.type })
        // const url = URL.createObjectURL(blob)
        conn = peer.connect('rec')
        conn.on('open', () => {
            console.log(`[+] Sending ${file}`)
            conn.send({file: file, type: file.type, name: file.name})
        })

    }

    const onRecieve = () => {
        if(!data && !metadata){
            alert('Not ready.')
            return;
        }
        console.log('[+] Saving Data', data)
        let blob
        if(metadata.type){
            blob = new File([data], {type: metadata.type});
        } 
        else{
            blob = new File([data]);
        }
        let a = document.createElement('a')
        document.body.appendChild(a); 
        a.href = URL.createObjectURL(blob)
        a.setAttribute('download', metadata.name)
        setTimeout(() => { URL.revokeObjectURL(a.href) }, 4E4) // 40s
        a.click()
        setUrl(URL.createObjectURL(blob)) // To Display/Preview Data
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



    const {now, text} = progessbar;

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
    </div>
    <div className="auth-inn">
    <form>
        <h3>Receive</h3>
    </form>{
        !recModal ? 
        <button type="submit" className="btn btn-primary btn-block" onClick={() => {setPeerId('rec'); setRecModal(true)}}> Receive </button>
        : <div>
        {
            (now !== 99) ? 
            <ProgressBar animated now={now} label={text} />
            : 
            <button className="btn btn-primary btn-block" onClick={onRecieve}> Download! </button>
        }</div>
    } 
    </div>
    {/* <div className="qrcode">
    <form>
        <h3>Scan Qr Code</h3>
    </form> 
    <QRCode  value="http://facebook.github.io/react/" />
    <br />
    <br />
    <br />
    </div> */}
    <div className ='lowercont'>
    <div className='lowerin'>
    <div>
      {userActivity.forEach(item => (
        <div>
          {item}
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
);
    
    
 };
 export default Main;