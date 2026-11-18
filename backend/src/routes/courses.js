const { crud } = require('./crud');

module.exports = crud('courses', [
  'code', 'title', 'description', 'teacher', 'credits', 'grade_level', 'status'
]);
