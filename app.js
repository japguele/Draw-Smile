// server.js

// set up ======================================================================
// get all the tools we need

var app = require('express')();
var express = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser');
var session      = require('express-session');

 // pass passport for configuration
var Images = require('./app/models/Images.js');
var Stories = require('./app/models/Stories.js')
var User = require('./app/models/User.js');
var Room = require('./app/models/Room.js');
var Rank = require('./app/models/Rankings.js');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect("mongodb://user:user@ds039211.mongolab.com:39211/smile");

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport,User);
// routes ======================================================================

var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    
    res.redirect('/login');
};

var loginRoutes = require('./routes/login.js')(router, passport);

//router.use(isAuthenticated);
var Images = require('./routes/Images.js')(router, Images);
var userRoutes = require('./routes/users.js')(router, User);
var roomRoutes = require('./routes/rooms.js')(router, Room);
var rankings = require('./routes/rankings.js')(router, Rank);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(loginRoutes);
app.use('/', isAuthenticated, userRoutes);
app.use('/', isAuthenticated, roomRoutes);

app.use('/',rankings);
app.set('view engine', 'jade');

// ================================================
// ================= IO SOCKET ====================
// ================================================
console.log("Reloaded");
io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg,id){
    io.sockets.emit('chat message ' + id, msg);
  });
});

server.listen(process.env.PORT || 5000);

// ================================================

