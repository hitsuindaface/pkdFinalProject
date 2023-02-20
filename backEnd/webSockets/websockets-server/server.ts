// WebSocket server
import { WebSocketServer } from "ws";

const port = 1234; // Will be changed
const wss = new WebSocketServer({port}); // wss = WebSocketServer

wss.on('connection', (ws) => {
    // Handles new connections

    ws.on('message', (data) => {
        console.log(`${data}`);
        // if (`${data}` === 'game end') {
        //     ws.send(`${winner} is winner`)
        //     ws.close()
        // }
    })
    
    ws.send(`Hello, this is server.ts!`);
});

// let counterA = 0;
// let counterB = 0;
// if ('answer A is correct') {
//     counterA += 1
// }
// if ('answer B is correct') {
//     counterB += 1
// }
// wss.on('message', (data) => {
    
// };)


console.log(`Listening at ${port}...`); // Notifies user of server activity at port