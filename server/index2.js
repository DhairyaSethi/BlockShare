const p2pserver = require('peer').PeerServer;
const peerServer = new p2pserver({ 
    host: 'localhost',
    port: 9000,
    expire_timeout: 3e6,
    alive_timeout: 3e6
    })

const clients = []
const users = []
const userActivity = []
let peerIds = []

const sendMessage = (type) => {
    Object.keys(clients).map(peerId => {
        clients[peerId].send({
            type: type,
            data: peerIds,
            userActivity: userActivity
        })
    })
}

peerServer.on('connection', client => {
    console.log('new connection id=>', client.id)
    peerIds.push(client.id)
    clients[client.id] = client;
    userActivity.push(`${new Date().toLocaleTimeString('en-US')} : ${client.id} has just joined!`)
    sendMessage('UserUpdate')    

})
peerServer.on('disconnect', client => {
    console.log('Disconnected id ==>', client.id)
    delete clients[client.id]
    userActivity.push(`${client.id} has left.`)
    let index = peerIds.indexOf(client.id)
    peerIds.splice(index)
    sendMessage('UserUpdate')
})

/*
ws.on('request', req => {
    console.log('New Request. Key->', req.key)
    let connection = req.accept(null, req.origin)
    const id = 'peer' + Math.floor(Math.random() * 100).toString()
    clients[id] = connection;
    peerIds.push(id)
    updatePeers(id)
    connection.sendUTF(JSON.stringify({
        type: 'welcome',
        id: id
    }))
    connection.on('message', msg => {
        if(msg.type === 'utf8') {
            const rec = JSON.parse(msg.utf8Data);
            console.log('message from client ', rec)
            switch(rec.type) {
                case 'newuser': newUser(rec, connection, id)
                case 'file' : fileRecieved(rec, connection)
                    
            }
        }
        if (msg.type === 'binary') {
            console.log('File recieved ', msg, 'now sending file back')
            connection.sendUTF(JSON.stringify({
                type: 'filerec',
                file: msg
            }))
        }
        else {
            console.log( ' file :( ', msg)
        }
    })
    
})

newUser = (data, conn, id) => {
    users.push({
        name: data.name,
        id: id,
        conn: conn
    })
    conn.sendUTF(JSON.stringify({
        type: 'usersdetected',
        name: data.name,
        id: id
    }))
}

const fileRecieved = (data, conn) => {
    conn.sendUTF(JSON.stringify({
        file: data.file,
        type: 'sending file back'
    }))
}

const updatePeers = (id) => {
    peerIds.forEach(peerId => {
        if(peerId === id) return;
        clients[id].sendUTF(JSON.stringify({
            type: 'newpeerfound',
            id: id
        }))
    })
}
*/