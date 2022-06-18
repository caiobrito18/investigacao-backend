const mongoose= require('mongoose')
const FileSchema = require('./model')

require('dotenv').config()

const conn = mongoose.createConnection(process.env.MONGO_ACCESS)
const FileModel = conn.model('files',FileSchema); 
function CreateFile(req){
  console.log(req);
  const FileDoc = new FileModel({
  file64:req.file64,
  client:req.client,
  tags:req.tags
  })
  FileDoc.save();
  const created = FileDoc;
  return created;
}


module.exports = CreateFile;