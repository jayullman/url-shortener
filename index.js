const express = require('express');
const validUrl = require('valid-url');

const app = express();
const port = process.env.port || 3000;

app.get('/*', (req, res, x) => {
  // console.log(req);

  // retrieve the passed in url and remove leading forward slash
  let url = req.url.slice(1);

  // check if http is a part of the url, append if missing
  if (url.search(/http/i) === -1) {
    url = 'http://' + url;    
  }

  // check if url is valid
  if (validUrl.isUri(url) && url.search(/www\./i) >= 0) {
    res.send(url);
  } else {
    console.log('Invalid Url');
    res.send({
      Error: 'Invalid URL'
    });
  }
  
});

// app.get('/:url', (req, res, x) => {
//   const url = req.params.url;

//   // check if url is valid
//   if (validUrl.isHttpUri(url)) {
//     console.log('It is valid');
//   } else {
//     console.log('Invalid Url');
//   }

//   // retrieve the passed in url
//   res.send(req.params.url);
// });

app.listen(port, function() {
  console.log('App is listening on port: ' + port);
});