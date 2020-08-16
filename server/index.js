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

function NewUser(msgFomClient, connection) {
    const {id} = msgFomClient
    console.log('New Peer ==>', id, 'connected.')
    userActivity.push(`${new Date().toLocaleTimeString('en-US')} : ${id} has just joined!`)
    clients[id] = connection;
    peerIds.push(id)
    
}

ws.on('request', req => {
    let connection = req.accept(null, req.origin)
    let peerId = ''

    connection.on('message', msg => {

        if(msg.type === 'utf8') {
            const msgFomClient = JSON.parse(msg.utf8Data);
            console.log(`Message from ${connection.id} ==> ${msgFomClient}`)


            switch(msgFomClient.type) {

                case types.NEW_USER :
                    NewUser(msgFomClient, connection)
                    peerId = msgFomClient.id
                    break;

                case types.SENT_FILE :
                    userActivity.push( `${new Date().toLocaleTimeString('en-US')} : ${peerId} just shared a document!`)
                    updatePeers()
            }
        }
    })

    connection.on('close', e => {
        let peerId = Object.keys(clients).find(key => clients[key] === connection)
        console.log('Peer ==>', peerId, 'disconneting.')
        delete clients[peerId]
        userActivity.push(`${new Date().toLocaleTimeString('en-US')} : ${peerId} has left.`)
        updatePeers()

    })
    
})


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
    NEW_USER: 'newUser'

}
updatePeers = () => {
    Object.keys(clients).map(client => {
        clients[client].sendUTF(JSON.stringify({
            type: types.USER_ACTIVITY_LOG,
            peerId: client,
            userActivity: userActivity
        }))
    })
}