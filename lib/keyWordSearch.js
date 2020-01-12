const {
  objectKeyFilter,
} = require('nodeutilz');
const dataBaseSearch = require('./dataBaseSearch.js');

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  if (keyWord){
    const assetSearchArray = dataBaseSearch('tags',keyWord);
    const assetSearchArrayFiltered = await objectKeyFilter(assetSearchArray,['name','serialNumber','inService','tags'])
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = JSON.stringify([...filteredData,assetSearchArrayFiltered],null,'\t')
    if (dataBlob.length > 0) {
      return dataBlob;
    } else {
      return dataBlob;
    }
  } else {
    return JSON.stringify(data,null,'\t');
  }
}