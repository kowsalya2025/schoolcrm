const { crud } = require('./crud');

module.exports = crud('classes', [
  'name', 'grade_level', 'section', 'room', 'teacher', 'capacity'
]);
