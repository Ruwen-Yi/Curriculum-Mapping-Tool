const express = require('express');
const app = express();

const path = require('path') // Used to specify an absolute path.

const { logger } = require('./api_prototype/api.middleware');

// import routes
const api = require('./api_prototype/api.routes');

// static assets (files that server doesn't modify before sending to browser)
app.use(express.static('./api_prototype/api_prototype.html'));

// Use middleware
app.use(logger);


// One way to setup route
app.get('/', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname, './api_prototype/api_prototype.html'));
});

// Another way to setup route, by using route and controller
app.use('/api', api);


app.listen(5000, () => {
    console.log('server is listening on port 5000');
});