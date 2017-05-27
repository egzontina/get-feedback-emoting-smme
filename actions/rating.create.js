const Cloudant = require('cloudant');

const self = exports;

function main(args) {
  console.log('rating.create', args);

  if (!args.questionId) {
    console.log('[KO] No questionId specified');
    return { ok: false };
  }

  if (!args.rating) {
    console.log('[KO] No rating specified');
    return { ok: false };
  }

  return new Promise((resolve, reject) => {
    self.create(
      args['services.cloudant.url'],
      args['services.cloudant.questions'],
      args['services.cloudant.ratings'],
      args.questionId,
      args.rating,
      (error, result) => {
        if (error) {
          console.log('[KO]', error);
          reject({ ok: false });
        } else {
          console.log('[OK] Rating created', result.id);
          resolve(result);
        }
      }
    );
  });
}

exports.main = global.main = main;

function create(cloudantUrl, questionsDatabase, ratingsDatabase,
  questionId, ratingValue, callback/* err,question */) {
  const cloudant = Cloudant({
    url: cloudantUrl,
    plugin: 'retry',
    retryAttempts: 5,
    retryTimeout: 500
  });
  const db = cloudant.db.use(questionsDatabase);
  db.get(questionId, (err) => {
    if (err) {
      callback(err);
    } else {
      const ratingsDb = cloudant.db.use(ratingsDatabase);
      const rating = {
        type: 'rating',
        question: questionId,
        value: ratingValue,
        created_at: new Date()
      };
      ratingsDb.insert(rating, (rErr, rResult) => {
        if (rErr) {
          callback(rErr);
        } else {
          rating.id = rResult.id;
          callback(null, rating);
        }
      });
    }
  });
}

exports.create = create;
