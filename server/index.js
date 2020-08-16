const port = 8000;
const websocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(port);
const ws = new websocketServer({ httpServer: server});
const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 9000, host:'localhost', path: '/' });

let peers = {}

peerServer.on('connection', conn => {
    console.log('[+]New Connection ', conn.id)
    peers[conn.id] = conn;

})
peerServer.on('close', conn => {
    console.log('[+] Diconnected ', conn.id)
    delete peers[conn.id]
})

ws.on('request', req => {
    let connection = req.accept(null, req.origin)
    const id = 'peer' + Math.floor(Math.random() * 100).toString()
    console.log('New Peer ==>', id, 'connected.')
    userActivity.push( `${id} is in the house!`)
    clients[id] = connection;
    peerIds.push(id)
    
    connection.sendUTF(JSON.stringify({
        type: types.WELCOME,
        id: id
    }))

    updatePeers(id, types.NEW_PEER_FOUND)

    connection.on('message', msg => {

        if(msg.type === 'utf8') {
            const msgFomClient = JSON.parse(msg.utf8Data);

            console.log(`Message from ${id} ==> ${msgFomClient}`)

            updatePeers(id)

            switch(msgFomClient.type) {
                case types.SENT_FILE : 
                    fileRecieved(msgFomClient, id)
                    userActivity.push( `${id} just shared a document!`)
                    updatePeers(id, types.USER_ACTIVITY_LOG)
                    
            }
        }
        // if file sending as string isn't possible, then use this?
        if (msg.type === 'binary') {
            console.log('File recieved ', msg, 'now sending file back')//this is a test, sending file back to sender
            connection.sendUTF(JSON.stringify({
                type: types.RECIEVE_FILE,
                file: msg
            }))
        }
    })

    connection.on('close', connection => {
        console.log('Peer ==>', id, 'disconneting.')
        delete clients[id]
        userActivity.push(`${id} has left.`)
        updatePeers(id, types.USER_ACTIVITY_LOG)

    })
    
})

const fileRecieved = (data, senderPeerId) => {
    // sending file to all peers except senderpeer
    //TODO add breaking file to chunks methods here
    Object.keys(clients).map(peerId => {
        //@FOR NOW SEND TOO EVERYONE, FIX THIS
//        if(peerId !== senderPeerId) { 
            clients[peerId].sendUTF(
                JSON.stringify({
                type: types.RECIEVE_FILE,
                file: data,
                sentby: senderPeerId
                })
            )
//        }
    })

}

const clients = {}
const users = []
const userActivity = []
let peerIds = []

const types = {
    NEW_PEER_FOUND: 'newpeer',
    WELCOME: 'welcome',
    RECIEVE_FILE: 'filerecieve',
    SENT_FILE: 'filesend',
    USER_ACTIVITY_LOG: 'log',

}



updatePeers = (id, type) => {

    if(type = types.NEW_PEER_FOUND) {
        Object.keys(clients).map(client => {
            let peer = client === peerIds[0] ? peerIds[1] : peerIds[0]
            clients[client].sendUTF(JSON.stringify({
                type: type,
                peerId: peer
            }))
        })
    }

    Object.keys(clients).map(client => {
        if(client !== id){
            clients[client].sendUTF(JSON.stringify({
                type: type,
                peerId: client,
                userActivity: userActivity
            }))
        }
    })
}