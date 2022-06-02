const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.objectId;

const fileSchema = new Schema({
  id:objectId,
  blob:Blob,
  tags:Array
})