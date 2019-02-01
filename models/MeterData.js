const mongoose = require('mongoose');

const meterDataSchema = new mongoose.Schema({
  counter_id: Number,
  consumption: Number,
  village_name: String,
  dateUpdated: {type: Date, default: Date.now}
})

const MeterData = mongoose.model('MeterData', meterDataSchema);

module.exports = MeterData;