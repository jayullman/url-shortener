const shortid = require('shortid');
const mongoose = require('mongoose');
const urlModel = require('./urlModel');

mongoose.Promise = global.Promise;

// generate short id and test if already exists in database
// ensures that the generated id is unique before saving

function getUniqueId() {
  const idPromise = new Promise((resolve, reject) => {

    function* CreateId() {
      let id;
      let idIsUnique = false;

      while (!idIsUnique) {
        id = shortid.generate().toLowerCase();
        let inDatabase = yield checkId(id)
        if (!inDatabase) {
          idIsUnique = true;
        }
      }
      resolve(id);
    }

    function checkId(id) {
      urlModel.findOne({ shortUrl: id }).then((doc) => {
        // record does not exist return false
        if (!doc) {
          gen.next(false);
        }
        else {
          gen.next(true);
        }
      });
    }

    let gen = CreateId();
    gen.next();
  })
  return idPromise;
}

module.exports = getUniqueId;