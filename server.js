
var express = require('express');


var app = express();
var bodyParser = require('body-parser');

var properties = require('./config/config');
var db = require('./config/db');
//auth routes
var authRoutes = require('./routers/user.routes');

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
var router = express.Router();

// call the database connectivity function
db();


app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);






// use express router
app.use('/api',router);
authRoutes(router); 


// //call auth routing
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})