const express = require('express');
const CreateFile = require('./controller');
const router = express.Router();

// upload
router.post('/upload', async(req,res, next) =>{
  await CreateFile(req.body);
  res.status(201).send(req.body);
  next();
})
module.exports = router;
