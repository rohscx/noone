const {
  objectKeyFilter,
} = require('nodeutilz');
const getDataBaseInventoryItem = require('./getDataBaseInventoryItem.js');

module.exports = async function (data,keyWord) {
  const assetSearchArray = await getDataBaseInventoryItem('tags',keyWord);  
  const assetSearchArrayFiltered = assetSearchArray.length > 0 
  ? assetSearchArray.map(({name,serialNumber,inService,tags}) => ({name,tags}))
  : [];
  const dataBlob = [assetSearchArrayFiltered];
  if (dataBlob.length > 0) {
    return dataBlob;
  } else {
    return dataBlob;
  }
}