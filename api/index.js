'use strict';

const express = require('express');

const app = express();

/**
 * Route to create shortened URL
 */
app.put('/create', (req, res) => {

});

/**
 * Route to retrieve original URL from alais and redirect
 * @param alias - the alias of the shortened URL
 */
app.get('/:alias', (req, res) => {
    
});

/**
 * Route to retrieve top N URLs
 * @param limit - the max number of URL retrieved
 */
app.get('/top/:limit', (req, res) => {

});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});