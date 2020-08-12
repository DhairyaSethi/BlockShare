const port = 8000;
const websocketServer = require('websocket').server;
const http = require('http');
const { connect } = require('http2');
const server = http.createServer();
server.listen(port);
const ws = new websocketServer({ httpServer: server});
const clients = {}
const users = []
const userActivity = []

ws.on('request', req => {
    console.log('New Request. Key->', req.key)
    let connection = req.accept(null, req.origin)
    const id = Math.floor(Math.random() * 100)
    clients[id] = connection;
    connection.sendUTF(JSON.stringify({
        type: 'welcome',
        msg: 'hello'
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