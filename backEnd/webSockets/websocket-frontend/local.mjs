// Wrapper to use require in a .mjs file
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// const cjsFile = require('./test') // test is regular .js file using module.exports

import { endGame } from "../../../frontEnd/PKDgame/src/routes/endGame.js";
import { questions } from '../../../frontEnd/PKDgame/src/routes/endGame.js'

// imports

import { test } from "./helpers.mjs";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('wss://localhost:1234').window.document;
// @connect
// Connect to the websocket
let socket;
// allows us to create a connection to our server websocket
const connect = () => {
    // return a promise, which will wait for the socket to open
    return new Promise((resolve, reject) => {
        const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
        const port = 1234;
        const socketURL = `${socketProtocol}//${window.location.hostname}:${port}/ws/`

        // Define socket
        // if socket is running localhost, socketURL can changbe changed to `http://localhost:${port}`
        socket = new WebSocket('wss://localhost:1234');

        socket.onopen = (e) => {
            // send test data
            socket.send(JSON.stringify({ 'loaded' : true}));
            // resolve the problem - we are connected
            resolve();
        }
        socket.onmessage = (data) => {
            console.log(data);
            let parsedData = JSON.parse(data.data);
            if (parsedData.append === true) {
                const newEl = document.createElement('p');
                newEl.textContent = parsedData.returnText;
                document.getElementById('websocket-returns').appendChild(newEl);
            }
        }
        socket.onerror = (e) => {
            // Return an error if any occurs
            console.log(e);
            resolve();
            // Try to connect again
            connect();
        }
    });
}

//@isOpen
// check if a websocket is open
const isOpen = (ws) => {
    return ws.isOpen === true
}

// when the document has loaded

// document.addEventListener('DOMContentLoaded', () => {
//     // connect to the websocket
    connect();
    // add  our event listeners
   // document.getElemenyByID('startbutton').addEventListener('click', (e) => { 
        // listens for clicks on our button in index.html
        if(isOpen(socket)) {
            socket.send(JSON.stringify({
                'tag' : 'qLen',
                'arrLen': qArr.length
            }))
            socket.on('message', (data) => {
                if (data.JSON.tag === 'lstq') {
                    // END GAME
                } else if (data.JSON.tag === 'continue') {
                    // CONTINUE
                }
            })
        }
   // });
// })

while (!endGame.game_over) {
    socket.send(JSON.stringify({
        'tag': 'eventGameOver',
        'gameOver': true,
        'finalPoints': endGame.final_points
    }))
}