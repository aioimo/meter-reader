const mongoose = require('mongoose');

const meterDataSchema = new mongoose.Schema({
  counter_id: Number,
  amount: Number,
  village: String,
  dateUpdated: {type: Date, default: Date.now}
})

const MeterData = mongoose.model('MeterData', meterDataSchema);

module.exports = MeterData;