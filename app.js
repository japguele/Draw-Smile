// server.js

// set up ======================================================================
// get all the tools we need

var app = require('express')();
var express = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser');
var multer       = require('multer');
var session      = require('express-session');

// pass passport for configuration
var Images = require('./app/models/Images.js');
var Stories = require('./app/models/Stories.js')
var User = require('./app/models/User.js');
var Room = require('./app/models/Room.js');
var Rank = require('./app/models/Rankings.js');


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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//var loginRoutes = require('./routes/login.js')(router, passport);

//router.use(isAuthenticated);
//var images = require('./routes/Images.js')(router, Images);
//var rankings = require('./routes/rankings.js')(router, Rank);

//router.use(isAuthenticated);
//var admin =  require('./routes/admin.js')(router);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}));

app.use(express.static(path.join(__dirname, 'views')));

//app.use(loginRoutes);*/
app.use('/users',  require('./routes/users.js')(express.Router(), User,Images));
app.use('/rooms',  require('./routes/rooms.js')(express.Router(), Room, User, Images));
//app.use('/stories',  require('./routes/stories.js')(express.Router(), Stories));
//app.use('/images',  require('./routes/Images.js')(express.Router(), Images));
//app.use('/rankings',rankings);*/

app.get('/',function(req,res){
	res.send("Welcome to the Smile & Draw Api");
});

app.set('view engine', 'jade');

// ================================================
// ================= IO SOCKET ====================
// ================================================
//console.log("Reloaded");

io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg,id){
    io.sockets.emit('chat message ' + id, msg);
  });
});

server.listen(process.env.PORT || 5000);

// ================================================

