const port = 8000;
const websocketServer = require('websocket').server;
const http = require('http')
const server = http.createServer();
server.listen(port);
const ws = new websocketServer({ httpServer: server});

const clients = {}
const users = {}
const userActivity = []

ws.on('request', req => {
    console.log('New Request.', req)
    
})