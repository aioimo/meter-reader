const express = require('express');
const router  = express.Router();


/* Simulating an EXTERNAL API that my system relies upon  to determine village for each meter */
router.get('/counter', (req, res, next) => {
  res.json({id: req.query.id, village_name: "Village Number #" + req.query.id})
});

module.exports = router;
