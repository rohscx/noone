const {
  objectKeyFilter,
  flattenArray,
} = require('nodeutilz');
const getDataBaseInventoryItem = require('./getDataBaseInventoryItem.js');
const nameSearch = require('./nameSearch.js');
const keyWordSearch = require('./keyWordSearch.js');

module.exports = async function (data,objectKey= "description",messageText) {

  
  const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
  if (keyWord){
    const tags = await keyWordSearch(keyWord);
    const names = await nameSearch(keyWord);
    const filteredData = data.filter((data) => String(data[objectKey])
    .toLowerCase()
      .search(keyWord[0]
          .trim()
          .toLowerCase()) != -1);
    const dataBlob = [...filteredData,{metaData:flattenArray([tags,names])}]; /// ...just be cause it's nested
    if (dataBlob.length > 0) {
      return dataBlob;
    } else {
      return dataBlob;
    }
  } else {
    return data;
  }
}