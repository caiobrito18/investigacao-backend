const mongoose= require('mongoose')
const fileSchema = require('./model')

require('dotenv').config()

const conn = mongoose.createConnection(process.env.MONGO_ACCESS)
const FileModel = conn.model('Files',fileSchema);  

function CreateFile(req){
  FileModel.create({
    blob:req.blob,
    tags:req.tags,
    modDate:new Date(),
    
  }, (err)=>{
    if(err){
      console.log(err)
    }
  })
}


module.exports = CreateFile;