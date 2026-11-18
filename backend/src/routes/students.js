const { crud } = require('./crud');

module.exports = crud('students', [
  'admission_no', 'first_name', 'last_name', 'email', 'phone', 'dob', 'gender',
  'grade', 'section', 'guardian_name', 'guardian_phone', 'address', 'status', 'user_id'
]);
