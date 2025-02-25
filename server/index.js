
// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Load express and start the server
const express = require('express');
const app = express();

// Load CORS
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


