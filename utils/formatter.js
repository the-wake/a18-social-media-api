const moment = require('moment');

function formatter(date) {
  console.log(`Current date: ${date}`);
  console.log('formatted date' + moment(date).format('llll'))
  return moment(date).format('llll');
};

module.exports = formatter;
