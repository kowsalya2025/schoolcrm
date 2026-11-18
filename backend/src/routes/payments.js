const { crud } = require('./crud');

module.exports = crud('payments', [
  'invoice_no', 'student_id', 'student_name', 'amount', 'method', 'status', 'description'
]);
