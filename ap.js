const express = require('express');
const app = express();
const PORT = 3000;

let server;

// Define a simple route with a "Stop Server" button
app.get('/', (req, res) => {
    res.send(`
        <h1>Hello, World!</h1>
        <button onclick="fetch('/stop', { method: 'POST' }).then(() => alert('Server stopped'))">Stop Server</button>
    `);
});

// Route to handle server shutdown
app.post('/stop', (req, res) => {
    res.send('Stopping server...');
    console.log('Server is stopping...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0); // Exit the process after closing the server
    });
});

// Start the server
server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
