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

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  if (keyWord){
    const assetSearchArray = await CustomerAsset.find({tags: {$in: [new RegExp(keyWord,'i')]}});
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = JSON.stringify([...filteredData,...objectKeyFilter(assetSearchArray,['name','serialNumber','inService','tags'])],null,'\t')
    let stringified;
    if (dataBlob.length > 0) {
      return dataBlob;
    } else {
      return dataBlob;
    }
  } else {
    return JSON.stringify(data,null,'\t');
  }
}