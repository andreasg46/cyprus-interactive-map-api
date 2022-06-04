const PORT = process.env.PORT || 5080;

const cors = require('cors');
const express = require('express');

const db = require('./db/configDB');

const user_api = require('./api/user_api');
const map_api = require('./api/map_api');

const date = new Date();
const server = express();

server.use(express.json())

// Connect DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

// Sync DB
async function init() {
    await db.sync();
}

init();


// Message
server.get("/", (req, res) => {
    res.send('Cyprus Maps API: ' + date)
});


// API Calls
server.use('/', user_api);
server.use('/', map_api);

server.use(cors);

server.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})