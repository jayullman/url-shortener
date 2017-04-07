const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create url schema and model
const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  }
});

const StoredUrl = mongoose.model('storedUrl', UrlSchema);


module.exports = StoredUrl;