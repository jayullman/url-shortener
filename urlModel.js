const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create url schema and model
const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  }
});

const StoredUrl = mongoose.model('storedUrl', UrlSchema);

mongoose.connect('mongodb://localhost/shortened-urls');

// replace mongoose's deprecated promise with the global promise
mongoose.Promise = global.Promise


module.exports = StoredUrl;