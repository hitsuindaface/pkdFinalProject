// WebSocket server
import { WebSocketServer } from "ws";

const port = 1234; // Will be changed
const wss = new WebSocketServer({port}); // wss = WebSocketServer

wss.on('connection', (ws) => {
    // Handles new connections

    ws.on('message', (data) => {
        console.log(`${data}`);
    })
    
    ws.send(`Hello, this is server.ts!`);
})

console.log(`Listening at ${port}...`); // Notifies user of server activity at port