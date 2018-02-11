'use latest';

const { MongoClient } = require('mongodb@2.2.11');
const { series } = require('async');

module.exports = function (ctx, done) {

  const { from, subject, received } = ctx.data;
  let email;

  MongoClient.connect(ctx.data.MONGO_URL, function (err, db) {
    if(err) return done(err);

    const job_list = [checkData, saveToDB, success];

    series(job_list, (err, results)=> {
      if (err) done(err);
      done(null, results);
    });

    // async function wrapper
    function saveToDB(cb) {
      save_email(email, db, function (err) {
        if(err) return cb(err);
  
        cb(null, 'Data saved!');
      });
    }
  });

  function checkData(cb) {
    if (from) {
      email = { from, subject, received };
      console.log(email);
      cb(null, `message from: ${from}`);
  
    } else {
      const err = new Error('no data');
      cb(err);
    }
  }
};

// Private functions
function save_email(email, db, cb) {
  const doc = {
    email
  };

  const increment = {
    $inc: {
      count: 1
    }
  };

  const opts = {
    upsert: true
  };

  db
    .collection('emails')
    .updateOne(doc, increment, opts, function (err) {
      if(err) return cb(err);

      console.log('Successfully saved email from %s', email.from);

      cb(null);
    });
}

function success(cb) {
  cb(null, 'We did a great Job');
}