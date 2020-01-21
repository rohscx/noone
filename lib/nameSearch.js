const {
  objectKeyFilter,
} = require('nodeutilz');
const getDataBaseInventoryItem = require('./getDataBaseInventoryItem.js');

module.exports = async function (keyWord) {
  const assetSearchArray = await getDataBaseInventoryItem('name',keyWord);
    
  const assetSearchArrayFiltered = assetSearchArray.length > 0 
  ? assetSearchArray.map(({name,serialNumber,inService,tags}) => ({name,serialNumber,tags}))
  : [];
  const dataBlob = [...assetSearchArrayFiltered];
  if (dataBlob.length > 0) {
    return dataBlob;
  } else {
    return dataBlob;
  }
}