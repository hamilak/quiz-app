const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const route = require('./src/routes/router')
require('./src/database/connect')

app.use(bodyParser.json());

app.use(cors({
    origin: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
    credentials: true
}))
const port = 3001;

app.use('/', route);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
