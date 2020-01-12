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
    const dataBlob = [...filteredData,...assetSearchArray]
    console.log("***SEARCHED**",dataBlob)
    if (dataBlob.length > 0) {
      console.log("***hit1")
      return JSON.stringify(dataBlob,null,'\t');
    } else {
      console.log("***hit2")
      return JSON.stringify([],null,'\t');
    }
  } else {
    console.log("***hit3")
    return JSON.stringify(data,null,'\t');
  }
}