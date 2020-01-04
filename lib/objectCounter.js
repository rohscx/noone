module.exports = function (data,name = "counted",options = {asString:false}) {
    const {asString} = options;
    const count = data.length;
    const countObj = {
        description:name,
        count,
    };
    if (asString) {
        return JSON.stringify(countObj,null,'\t'); 
    } else {
        return countObj; 
    }
};