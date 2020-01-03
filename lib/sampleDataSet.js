module.exports = function (data,sampleKey,sampleSize = 3) {
    const keys = [];
    return data.reduce((n,o,i) => {
        if(i > 0) {
            if(!keys.includes(o[sampleKey])) n.push(o);
            return n;
        } else {
            keys.push(o[sampleKey]);
            n.push(o);
            return n;
        }
    },[]).filter((f,i) => i+1 < sampleSize)
};