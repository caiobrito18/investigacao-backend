const express = require('express');
const controller = require('./controller');
const router = express.Router();

// upload
router.post('/upload', async(req,res, next) =>{
  await controller.create(req.body);
  res.status(201).send(req.body);
  next();
})

router.get('/list', async(req,res) =>{
  const Files = await controller.list().catch(err => console.log(err))
  res.status(201).send(Files);
})
module.exports = router;
