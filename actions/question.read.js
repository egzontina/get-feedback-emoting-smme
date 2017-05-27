const Cloudant = require('cloudant');

const self = exports;

function main(args) {
  console.log('question.read', args);

  if (!args.id) {
    console.log('[KO] No id specified');
    return { ok: false };
  }

  return new Promise((resolve, reject) => {
    self.get(
      args['services.cloudant.url'],
      args['services.cloudant.questions'],
      args.id,
      (error, result) => {
        if (error) {
          console.log(args.id, '[KO]', error);
          reject({ ok: false });
        } else {
          console.log(args.id, '[OK]');
          resolve(result);
        }
      }
    );
  });
}

exports.main = global.main = main;

function get(cloudantUrl, cloudantDatabase, questionId, callback/* err,question */) {
  const cloudant = Cloudant({
    url: cloudantUrl,
    plugin: 'retry',
    retryAttempts: 5,
    retryTimeout: 500
  });
  const db = cloudant.db.use(cloudantDatabase);
  db.get(questionId, { include_docs: true }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // only expose a subset of the fields through the API
      const question = {
        id: result._id,
        title: result.title,
        use_cookies: result.use_cookies,
        created_at: result.created_at
      };
      callback(null, question);
    }
  });
}

exports.get = get;
