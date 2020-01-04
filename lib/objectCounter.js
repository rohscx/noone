module.exports = function (data,name = "counted") {
    const count = data.length;
    return {[name]:count} ;
};