module.exports = function (data,name = "counted",options = {}) {
    const {asString = false} = options;
    const count = data.length;
    if (asString) {
        return JSON.stringify({[name]:count}); 
    } else {
        return {[name]:count}; 
    }
};