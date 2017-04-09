var express = require('express');
const path = require('path');

var app = express();

var port = process.env.PORT || 8080;

const months = ['January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October',
  'November', 'December'];


app.use(express.static('public'));

// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // res.send('Home page');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/*', (req, res) => {

  var dateObj;
  var unixStamp;
  var natural;

  // extract the string after the home directory
  const query = decodeURIComponent(req.url.slice(1));

  if (isNaN(query)) {
    dateObj = new Date(query);

    // obtain unix time from UTC time
    unixStamp = dateObj.valueOf() / 1000;

    natural = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`


  } else {
    console.log(('num'));
    dateObj = new Date(query * 1000);
    console.log(dateObj);
    unixStamp = query;
    natural = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`

  }

  // tests for valid date, if not, returns null for both properties
  if (natural.indexOf('undefined') > -1 || natural.indexOf('NaN') > -1 || unixStamp === '') {
    unixStamp = null;
    natural = null;
  }

  var responseObj = {
    unix: unixStamp,
    natural: natural
  }

  res.send(responseObj);

});

app.listen(port, () => {
  console.log('app is listening on port 3000');
});