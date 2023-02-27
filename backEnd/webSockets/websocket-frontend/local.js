
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
        socket = new WebSocket(socketURL);

        socket.onopen = (e) => {
            // send test data
            socket.send(JSON.stringify({ 'loaded' : true}));
            // resolve the problem - we are connected
            resolve();
        }
    });
}

//@isOpen
// check if a websocket is open
const isOpen = (ws) => {
    return ws.readyState === ws.OPEN
}

// when the document has loaded
document.addEventListener('DOMContentLoaded', () => {
    // connect to the websocket
    connect();
    // add  our event listeners
    document.getElemenyByID('websocket-button').addEventListener('click', (e) => { 
        // listens for clicks on our button in index.html
        if(isOpen(socket)) {
            socket.send(JSON.stringify({
                'tag' : 'qAns',
                'arrLen': 'current arr len'
            }))
            socket.on('message', (data) => {
                if (data.JSON.tag === 'lstq') {
                    // END GAME
                } else if (data.JSON.tag === 'continue') {
                    // CONTINUE
                }
            })
        }
    });
})