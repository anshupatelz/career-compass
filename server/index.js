// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('Environment variables loaded from .env file');
} else {
    console.log('Running in production mode');
}

// Check if PORT is set
if (!process.env.PORT) {
    console.error('Error: PORT environment variable is not set');
    process.exit(1);
}

// Load dependencies and start server
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});