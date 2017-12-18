var express = require('express');
var router = express.Router();

/**
 * GET top shorten URLS.
 * @param limit - Limit of top URLs to retrieve. Default: 5
 */
router.get('/top/:limit?', function(req, res, next) {
  let limit = req.params.limit || 5;  
  // TODO: implement
});

/**
 * GET full url from alias and redirect if exists.
 * @param alias - The generated/custom alias of short URL
 */
router.get('/shorten/:alias', function(req, res, next) {
  // TODO: implement 
});

/**
 * PUT a new short URL
 * @param url - The original URL to be shorten
 * @param CUSTOM_ALIAS - (optional) The custom alias to use in short url generation
 */
router.put('/shorten', function(req, res, next) {
  // TODO: implement 
});

module.exports = router;
