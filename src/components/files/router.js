const express = require('express')
const router = express.Router();

// upload
router.post('/upload', async(req,res) =>{
  console.log(req)
  res.status(201).send(req.body);
})
module.exports = router;
