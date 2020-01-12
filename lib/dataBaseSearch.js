const {
  objectKeyFilter,
} = require('nodeutilz');
const mongoose = require('mongoose');
require('dotenv').config();
const CustomerAsset = require('./model/c001CustomerAsset.js');

const dbAuth = process.env.MONGO_URI_c001;
mongoose.connect(dbAuth,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },() => 
  console.log('connected to db c001!')
);

module.exports = async function (objectKey= "tags",objectValue) {

  const result = await CustomerAsset.find({[objectKey]: {$in: [new RegExp(objectValue,'i')]}});
  return JSON.stringify(result,null,'\t');
}