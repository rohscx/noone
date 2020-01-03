module.exports = function (data,timeZone) {
        const targetTime = new Date(data);
        const timeZoneFromDB = timeZone.toLowerCase() === "est" ? -5.00 : -7; //time zone value from database
        //get the timezone offset from local time in minutes
        const tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
        //convert the offset to milliseconds, add to targetTime, and make a new Date
        const offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
        return new Date(offsetTime).toLocaleString();
};