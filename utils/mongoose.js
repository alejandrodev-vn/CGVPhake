module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    convertToYYYYMMDD: function (d){
        date = new Date(d);
        year = date.getFullYear();
        month = date.getMonth()+1;
        dt = date.getDate();
    
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return (year+'-' + month + '-'+dt);
    },
    convertToDDMMYYYY: function (d){
        date = new Date(d);
        year = date.getFullYear();
        month = date.getMonth()+1;
        dt = date.getDate();
    
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return (dt+'/' + month + '/'+year);
    }
}
