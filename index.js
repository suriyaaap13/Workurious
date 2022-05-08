const express = require('express');
const bodyParser = require("body-parser");
const db = require('./config/mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// set path for static files
app.use(express.static('./assets'));

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(3000, function(err){
    if(err){console.log(err);return;}
    console.log("Server is up and running");
})