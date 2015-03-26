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


require('./config/passport')(passport); // pass passport for configuration

var User = require('./app/models/User.js');
var Room = require('./app/models/Room.js');
var Rank = require('./app/models/Rankings.js');

mongoose.connect("mongodb://user:user@ds039211.mongolab.com:39211/smile");

//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

//app.use(passport.initialize());
//app.use(passport.session()); // 


// configuration ===============================================================
 // connect to our database


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

//app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var router = express.Router();

//var loginRoutes = require('./routes/login.js')(app,passport)

var userRoutes = require('./routes/users.js')(router, User);
var roomRoutes = require('./routes/rooms.js')(router, Room);
var rankings = require('./routes/rankings.js')(router, Rank);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', router);
//app.use(loginRoutes);
app.use(userRoutes);
app.use(roomRoutes);
app.use(rankings);




var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	// just to test
  res.sendfile('views/index.html');
});



// ================================================
// ================= IO SOCKET ====================
// ================================================

io.on('connection', function(socket){
  socket.on('chat message', function(msg,id){
    io.emit('chat message ' + id, msg);
  });
});

http.listen(8080, function(){
  console.log('io listening on *:3000');
});
// ================================================



//app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function(){
    console.log('Magic happens on port ' + app.get('port'));
});