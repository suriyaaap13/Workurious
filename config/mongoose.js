const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Workurious_development');

mongoose.connect("mongodb+srv://admin_suriyaa:Senthil3%40@cluster0.ial60.mongodb.net/Workurious");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongoDB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;