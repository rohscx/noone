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
    let stringified;
    if (dataBlob.length > 0) {
      
      stringified = JSON.stringify(dataBlob,null,'\t');
      console.log("***hit1",typeof(stringified), stringified.length)
      return stringified;
    } else {
      stringified = JSON.stringify([],null,'\t');
      console.log("***hit2",typeof(stringified), stringified.length)
      return stringified;
    }
  } else {
    stringified = JSON.stringify(data,null,'\t');
    console.log("***hit3",typeof(stringified), stringified.length)
    return stringified;
  }
}