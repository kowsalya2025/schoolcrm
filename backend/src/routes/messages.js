const { crud } = require('./crud');

module.exports = crud('messages', [
  'sender', 'recipient', 'subject', 'body', 'is_read'
]);
