const assert = require('assert');
const StoredUrl = require('../urlModel');

describe('Save to database', () => {

  it('Saves a URL to the database', () => {
    var url = new StoredUrl({
      url: 'http://www.google.com'
    }); 

    return url.save().then(function() {
      assert(true);
    });

    // assert(false);
  });

});