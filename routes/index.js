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
        consumption: amount,
        village_name
      })
      return newMeterData.save()
    })
    .then(response => {
      res.json(response)
    })
    .catch(err=>{
      console.log("ERROR POST /counter-callback", err)
      res.status(500).json({error: "Something went wrong."})    
    })
})


router.get('/consumption_report', (req, res, next) => {
  const searchRange = {
    "24h": 24*60*60*1000        // 24 h/d * 60 min/h * 60 s/min * 1000 ms/s
  }
  MeterData.find({
      dateUpdated: {
          $gte: new Date() - searchRange[req.query.duration]    //returns only the datapoints submitted from desired time frame
        }
    },{
      village_name: 1,                //returns only these fields of interest 
      consumption: 1,
      _id: 0
    })
    .sort({dateUpdated: -1})          //most recent data first                                   
    .then(meterData => {
      res.json({villages: meterData})
    })
    .catch(err=> {
      console.log("Error GET /consumption-report: ", err)
      res.status(500).json({error: "Something went wrong."}) 
    })
})


module.exports = router;