const moment = require('moment')

const MOMENT = {}

MOMENT.startWeek = moment().startOf('week').get('date')
MOMENT.endWeek = moment().endOf('week').get('date')
MOMENT.getMonth = moment(new Date()).get('M') + 1

module.exports = { MOMENT }
