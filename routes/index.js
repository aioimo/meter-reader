const express = require('express');
const router  = express.Router();
const axios = require('axios')
const MeterData = require('../models/MeterData')


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
  MeterData.find({
    dateUpdated: {
      $gte: new Date() - 24*60*60*1000      //returns only the datapoints submitted in last 24h
    }}, 
    {village: 1, amount: 1}                 //returns only these fields of interest
  )
  .then(meterData => {
    let consumption_report = {}
    meterData.forEach(data => {

    })
    res.json(meterData)
  })
  .catch(err=> {console.log("error", err)})
})



module.exports = router;
