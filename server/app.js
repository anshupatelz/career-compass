// Importing express
const express = require('express');
const app = express();

// Importing cors
const cors = require('cors');
app.use(cors());

// Importing config and connecting to database
const connectDB = require('./config/db');
connectDB();


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to CareerCompass. Access API via /api route',
        avaliableRoutes: ['/api']
    })
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the CareerCompass API',
        avaliableVersions: ['v1'],
        latestVersion: 'v1',
        avaliableRoutes: ['/v1']
    });
});

app.get('/api/v1', (req, res) => {
    res.json({
        message: 'You are using Career Compass API - Version 1',
        avaliableRoutes: ['/users']
    });
});

module.exports = app;