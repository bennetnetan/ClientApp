const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/ClientDB';

mongoose.connect(url, function(err, db){
    console.log('Connected');
});

module.exports = mongoose;  