const {
  objectKeyFilter,
} = require('nodeutilz');
const getDataBaseInventoryItem = require('./getDataBaseInventoryItem.js');
const nameSearch = require('./nameSearch.js');
const keyWordSearch = require('./keyWordSearch.js');

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  if (keyWord){
    const tags = await keyWordSearch(keyWord);
    const names = await nameSearch(keyWord);
    console.log(tags,names)
    const assetSearchArray = [...tags,...names];
    const assetSearchArrayFiltered = assetSearchArray.length > 0 
    ? assetSearchArray.filter((f) => f.length <= 0).map(({name,serialNumber,inService,tags}) => ({name,serialNumber,tags}))
    : [];
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = [...filteredData,{metaData:[...assetSearchArrayFiltered]}];
    if (dataBlob.length > 0) {
      return dataBlob;
    } else {
      return dataBlob;
    }
  } else {
    return data;
  }
}