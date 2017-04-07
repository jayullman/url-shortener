const express = require('express');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const urlModel = require('./urlModel');
const getUniqueId = require('./getUniqueId');

// connect to database
mongoose.connect('mongodb://localhost/shortened-urls', function() {
  console.log('Connected to database');
});
// replace mongo's deprecated promise
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.port || 3000;

app.use(express.static('public'));

app.get('/new/*', (req, res) => {

  function sendResultAsJSON(doc) {
    res.send({
      originalUrl: doc.originalUrl,
      shortUrl: doc.shortUrl
    });
  }
 
  // retrieve the passed in url and remove '/new/'
  let input = req.url.slice(5);
  console.log(input);
  let url = input;

  // check if http is a part of the url, append if missing
  if (url.search(/http/i) === -1) {
    url = 'http://' + url;    
  }

  // check if url is valid
  // if (validUrl.isUri(url) && url.search(/www\./i) >= 0) {
  if (validUrl.isUri(url)) {
    // first check if url is already located in database
    urlModel.findOne({ originalUrl: url }).then((result) => {
      if (result) {
        console.log('Found url in database');
        sendResultAsJSON(result);
      } else {
        console.log('Did not find url in database');
        // create shortUrl, check against db, then save to database   
        getUniqueId().then((id) => {
          const newRecord = new urlModel({ originalUrl: url, shortUrl: id })
          newRecord.save(url).then((savedRecord) => {
            sendResultAsJSON(savedRecord);
          });
        });
      }
    });
  // if user input is not valid url
  } else {
    res.send({
      Error: 'Invalid URL'
    });
  }
});

app.get('/:shortUrl', (req, res) => {
  urlModel.findOne({ shortUrl: req.params.shortUrl }).then((doc) => {
    if (!doc) {
      res.send({
        Error: 'URL not found in database'
      });
    } else {
      res.redirect(doc.originalUrl);
      // res.send(doc);
    }
  });
});

app.listen(port, function() {
  console.log('App is listening on port: ' + port);
});