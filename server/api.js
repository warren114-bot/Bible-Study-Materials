const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/api', (req, res) => {
    res.send('Hello from Warren114 Bot API!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});