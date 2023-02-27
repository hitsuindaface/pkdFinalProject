// Starts a WebSocket client and connects to a server
import WebSocket from "ws";

const port = 1234;
const ws = new WebSocket(`ws://localhost:${port}`);

ws.on('open', () => {
    console.log(`[Client] Connected.`);
    ws.send(`Hi, this is a client!`);
});
ws.on('message', (data) => {
    console.log(`Received a message from the server: ${data}`);
});

ws.on('questions', (question) => {
    // Receives array of questions from server
});

// TODO: Add logic for array of questions depleted

// If all questions are used, game over
ws.on('gameOver', (data) => {
    ws.emit('scoreLine', 'request')
});
ws.on('finalScore', (score) => {
    console.log(`${score.score}`) // Score is given as user1: x user2: y
    console.log(`${score.winner}`); // Displays winner
})

ws.on('message', (score) => {
    
});