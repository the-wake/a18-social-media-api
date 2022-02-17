const moment = require('moment');

function formatter(date) {
  return moment(date).format('llll');
};

module.exports = formatter;
