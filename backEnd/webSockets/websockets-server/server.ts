// WebSocket server
import { WebSocketServer } from "ws";

const port = 1234; // Will be changed
const wss = new WebSocketServer({port}); // wss = WebSocketServer
wss.clients

wss.on('connection', (ws) => {
    // Handles new connections

    ws.on('message', (data) => {
        console.log(`${data}`);
        // if (`${data}` === 'game end') {
        //     ws.send(`${winner} is winner`)
        //     ws.close()
        // }
        console.log(wss.clients);
    });

    ws.send('Server initialized successfully');
});


// Server TODO: 
/**
 * Send and hold questions
 * Take and hold user score
 * [[user: User, score: number], [user: User, score: number]];
 */




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