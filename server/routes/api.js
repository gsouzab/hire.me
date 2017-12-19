const express = require('express');
const mongoose = require('mongoose');
const Url = require('../models/url');
const bijection = require('../bijection');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

let router = express.Router();

/**
 * GET top shorten URLS.
 * @param limit - Limit of top URLs to retrieve. Default: 5
 */
router.get('/top/:limit', async (req, res, next) => {
  let limit = parseInt(req.params.limit) || 5;  
  const topURLs = await Url.find().sort({access_count: -1}).limit(limit);
  res.send(topURLs);
});

/**
 * GET full url from alias and redirect if exists.
 * @param alias - The generated/custom alias of short URL
 */
router.get('/:alias', async (req, res, next) => {
  const alias = req.params.alias;
  try {
    const url = await Url.findOneAndUpdate({alias : alias}, {$inc: {access_count: 1} });
    if (url) {
      res.redirect(url.original_url);
    }    
  } catch (error) {
    console.log(error);
    next();
  }  
});

/**
 * PUT a new short URL
 * @param url - The original URL to be shorten
 * @param CUSTOM_ALIAS - (optional) The custom alias to use in short url generation
 */
router.put('/create', async (req, res, next) => {
  let customAlias = req.query.CUSTOM_ALIAS;
  let originalUrl = req.query.url;

  try {
    if (customAlias) {
      let url = await Url.findOne({custom_alias: customAlias});
      if (url) {
        // URL exists, CUSTOM_ALIAS already in DB
        let err = new Error('ALIAS_EXISTS');
        err.status = 400;
        err.message = {ERR_CODE: '001', Description: 'CUSTOM ALIAS ALREADY EXISTS'};
        return next(err);
      }
    }

    let shortUrl = Url({
      original_url: originalUrl,
      custom_alias: customAlias
    });

    shortUrl = await shortUrl.save();

    res.send(shortUrl);
    
  } catch (error) {
    console.log(error);
    next()
  }
});

module.exports = router;
