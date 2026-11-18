const { crud } = require('./crud');

module.exports = crud('schedules', [
  'title', 'course', 'day', 'start_time', 'end_time', 'room'
]);
