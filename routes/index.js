const express = require('express');
const router  = express.Router();
const axios = require('axios')
const MeterData = require('../models/MeterData')
const formatData = require('../utils/functions')


router.post('/counter-callback', (req,res,next) => {
  const { counter_id, amount } = req.body
  axios.get('http://localhost:3000/external/counter', {      //Simulating an external API call to determine village name
    params: {
      id: counter_id
    }
  })
  .then(response => {
    const {village_name} = response.data
    const newMeterData = new MeterData({
      counter_id,
      amount,
      village: village_name
    })
    return newMeterData.save()
  })
  .then(response => {
    res.json(response)
  })
  .catch(err=>{console.log("ERROR POST", err)})
})


router.get('/consumption_report', (req, res, next) => {
  const searchRange = {
    "24h": 24*60*60*1000,
    "7d": 7*24*60*60*1000
  }
  MeterData.find({
      dateUpdated: 
        {
          $gte: new Date() - searchRange[req.query.duration]    //returns only the datapoints submitted from desired time frame
        }
    },{
      village: 1, 
      amount: 1
    })                                  //returns only these fields of interest           
  .then(meterData => {
    res.json({villages: formatData(meterData)})
  })
  .catch(err=> {console.log("error", err)})
})


module.exports = router;