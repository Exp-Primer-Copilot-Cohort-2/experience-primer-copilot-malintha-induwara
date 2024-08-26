// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
const commentsPath = path.join(__dirname, 'comments.json');
let comments = [];
if (fs.existsSync(commentsPath)) {
    comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
}

// Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2), 'utf8');
    res.status(201).json(comment);
});

// Delete all comments
app.delete('/comments', (req, res) => {
    comments = [];
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2), 'utf8');
    res.status(204).end();
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

