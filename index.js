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

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// use express router
app.use('/', require('./routes'));

// setting the port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(err){
    if(err){console.log(err);return;}
    console.log("Server is up and running");
})