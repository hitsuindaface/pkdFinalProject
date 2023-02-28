// imports path and url dependencies
import path from 'path';
import { fileURLToPath} from 'url';

// get the directory and file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import express, expressWs and http
import express from 'express';
import expressWs from 'express-ws';
import http from 'http';

// port
let port = 1234;

// app and server
let app = express();
let server = http.createServer(app).listen(port);

// apply expressws
expressWs(app, server);
app.use(express.static(__dirname + '/views'));

// get the route /
app.get('/', (req, res) => {
    res.status(200).send('Welcome to our app');
});

// clients
const sockets = {};
let UID = 0;

// This lets the server pick up the '/ws' webSocket route
app.ws('/ws', async function(ws, req) { // app.ws refers to the websocket and that's what we try to connect to on the frontend. 
    // after which we wait for a message and respond to it
    ws.on('connection', (user) => {
        UID++;
        sockets[UID] = user;
    });
    let u1score = 0;
    let u2score = 0;
    ws.on('message', async function(msg) {
        // if a message occurs, we'll console log it on the server
        console.log(msg);
        // send back some data
        let sendData = 0;
        sockets[1].on('message', (u1) => {
            if (u1.JSON.tag === gameEnded) {
                u1score = u1.JSON.score;
                sendData++ // adds 1 to sendData
            }; 
        })
        sockets[2].on('message',(u2) => {
            if (u2.JSON.tag === gameEnded) {
                u2score = u2.JSON.score;
                sendData++ 
            }
        }) 
        if (sendData === 2) {
            ws.send(JSON.stringify({
                'user1': u1score,
                'user2': u2score
            }));
        }
    });
})
