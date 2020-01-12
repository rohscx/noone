const mongoose = require('mongoose');
require('dotenv').config();
const CustomerAsset = require('./model/c001CustomerAsset.js');

const dbAuth = process.env.MONGO_URI_c001;
mongoose.connect(dbAuth,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },() => 
  //console.log('connected to db!')
);

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  const assetSearchArray = await CustomerAsset.find({tags: {$in: [new RegExp(keyWord,'i')]}});
  console.log("***SEARCHED**",assetSearchArray)
  if (keyWord){
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = [...filteredData,...assetSearchArray]
    if (filteredData.length > 0) {
      return JSON.stringify(dataBlob,null,'\t');
    } else {
      return JSON.stringify(dataBlob,null,'\t');
    }
  } else {
    return JSON.stringify(dataBlob,null,'\t');
  }
}