// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser');
var session      = require('express-session');



var User = require('./app/models/User.js');
var Room = require('./app/models/Room.js');
var Rank = require('./app/models/Rankings.js');

mongoose.connect("mongodb://localhost:27017/eindopdracht");


var router = express.Router();
var userRoutes = require('./routes/users.js')(router, User);
var roomRoutes = require('./routes/rooms.js')(router, Room);
var rankings = require('./routes/rankings.js')(router, Rank);
// configuration ===============================================================
 // connect to our database

 //require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', router);
app.use(userRoutes);
app.use(roomRoutes);
app.use(rankings);
//app.set('view engine', 'ejs'); // set up ejs for templatingS

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in sessionSS

// routes ======================================================================
//require('./routes/login.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function(){
    console.log('Magic happens on port ' + app.get('port'));
});