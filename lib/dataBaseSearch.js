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

    const tagsFiltered = tags.length > 0 
    ? tags.map(({name,serialNumber,inService,tags}) => ({name,serialNumber,tags}))
    : [];
    const namesFiltered = names.length > 0 
    ? names.map(({name,serialNumber,inService,tags}) => ({name,serialNumber,tags}))
    : [];
    const assetSearchArrayFiltered = [...tagsFiltered,...namesFiltered].filter((f) => Object.keys(f).length > 0);
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