const express = require('express');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const path = require('path');
const urlModel = require('./src/urlModel');
const getUniqueId = require('./src/getUniqueId');

// replace mongo's deprecated promise
mongoose.Promise = global.Promise;

console.log('heroku test');

// connect to MongoDB locally or mLab remotely depending on environment variable
const mongoUrl = process.env.MONGODB_LOCAL || process.env.MONGOLAB_URI;

const options = process.env.MONGOLAB_URI 
  ? {
      server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
    }
  : {};

mongoose.connect(mongoUrl, options);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));  


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/new/*', (req, res) => {

  function sendResultAsJSON(doc) {
    res.send({
      originalUrl: doc.originalUrl,
      shortUrl: doc.shortUrl
    });
  }
 
  // retrieve the passed in url and remove '/new/'
  let input = req.url.slice(5);
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
        sendResultAsJSON(result);
      } else {
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