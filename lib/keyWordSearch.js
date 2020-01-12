const {
  objectKeyFilter,
} = require('nodeutilz');
const dataBaseSearch = require('./dataBaseSearch.js');

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  if (keyWord){
    const assetSearchArray = await dataBaseSearch('tags',keyWord);
    
    const assetSearchArrayFiltered = assetSearchArray.length > 0 
    ? assetSearchArray.map(({name,serialNumber,inService,tags}) => ({name,serialNumber,inService,tags}))
    : [];
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = [...filteredData,assetSearchArrayFiltered];
    if (dataBlob.length > 0) {
      return dataBlob;
    } else {
      return dataBlob;
    }
  } else {
    return data;
  }
}