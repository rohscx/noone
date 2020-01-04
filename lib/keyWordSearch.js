module.exports = function (data,objectKey= "description",messageText) {
    const keyWord = messageText.match(new RegExp(/(?<=\[).+?(?=\])/));
    let asString;
    if (keyWord){
      const filteredData = data.filter((data) => String(data[objectKey])
      .toLowerCase()
        .search(keyWord[0]
            .trim()
            .toLowerCase()) != -1);
      if (filteredData.length > 0) {
        return asString = JSON.stringify(filteredData,null,'\t');
      } else {
        return asString = JSON.stringify(data,null,'\t');
      }
    } else {
      return asString = JSON.stringify(data,null,'\t');
    }
}