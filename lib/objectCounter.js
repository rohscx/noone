module.exports = function (data,name = "counted",options ={asString=false}) {
    const {asString} = options;
    const count = data.length;
    if (asString) {
        return JSON.stringify({[name]:count}); 
    } else {
        return {[name]:count}; 
    }
};