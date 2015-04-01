var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

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
var Images = require('../app/models/Images.js');
var Stories = require('../app/models/Stories.js')
var User = require('../app/models/User.js');
var Room = require('../app/models/Room.js');
var Rank = require('../app/models/Rankings.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




mongoose.connect("mongodb://user:user@ds039211.mongolab.com:39211/smile");

var router = express.Router();

var stories = require('../routes/Stories.js')(router, Stories);
var images = require('../routes/Images.js')(router, Images);
var userRoutes = require('../routes/users.js')(router, User);
var roomRoutes = require('../routes/rooms.js')(router, Room,Images);
var rankings = require('../routes/rankings.js')(router, Rank);

app.use('/',  userRoutes);
app.use('/',  roomRoutes);
app.use('/',  stories);
app.use('/',  images);
app.use('/',rankings);


function makeRequest(route, statusCode, done){

	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};


function makePost(route, params ,statusCode, done){

	 request(app)
		.post(route)
		.type('json')
		.send(params)
		.expect(statusCode)
		.end(function(err,res){
			if(err){return done(err);}
			done(null,res);
		});
	

}





describe('Testing route ', function(){	
	describe(' images' ,function(){
		it(' get ' , function(done){			
			makeRequest('/Images', 200, function(err, res){
					if(err){ return done(err); }
					expect(res.body.status).to.equal('OK');
					expect(res.body.data).to.not.be.null;
				
					done();
			});
		});
		it(' get by id ', function(done){
				makeRequest('/Images', 200, function(err, res){
					if(err){ return done(err); }
					
					makeRequest('/Images/' + res.body.data[0]._id, 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});						
		});
		it( 'post Image', function(done){
			var x = {"image": "bae64string"}
		
			makePost('/Images',x,201,function(err,res){
				if(err){return done(err);}
				expect(res.body.status).to.equal('OK');
				expect(res.body.data.image).to.not.be.null;		
				
				done();

			});
		});


	});
	describe(' Rankings' ,function(){
		it(' get ' , function(done){			
			makeRequest('/Rankings', 200, function(err, res){
					if(err){ return done(err); }
					expect(res.body.status).to.equal('OK');
					expect(res.body.data).to.not.be.null;
				
					done();
			});
		});
		it(' get by id ', function(done){
				makeRequest('/Rankings', 200, function(err, res){
					if(err){ return done(err); }
			
					makeRequest('/Rankings/' + res.body.data[0]._id, 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});							
		});	
			it( 'post ranking', function(done){
			  
		
			makePost('/Rankings',{"score" : 100 },201,function(err,res){
				if(err){return done(err);}
				expect(res.body.status).to.equal('OK');
				expect(res.body.data.score).to.not.be.null;		
				
				done();

			});
		});	
	});
	describe(' Rooms' ,function(){
		it(' get ' , function(done){			
			makeRequest('/rooms', 200, function(err, res){
					if(err){ return done(err); }
					expect(res.body.status).to.equal('OK');
					expect(res.body.data).to.not.be.null;
				
					done();
			});
		});		
		it(' get by id ', function(done){
				makeRequest('/rooms', 200, function(err, res){
					if(err){ return done(err); }
			
					makeRequest('/rooms/' + res.body.data[0]._id, 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});							
		});	
		it( ' get roomusers' , function(done){

			makeRequest('/rooms', 200, function(err, res){
					if(err){ return done(err); }
			
					makeRequest('/rooms/' + res.body.data[0]._id + '/users', 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});				
		});	
		it( ' get room user by id' , function(done){

			makeRequest('/rooms', 200, function(err, res){
					if(err){ return done(err); }
				var roomId = res.body.data[0]._id
					makeRequest('/rooms/' + roomId + '/users', 200, function(err, res1){
						if(err){ return done(err); }
							makeRequest('/rooms/' + roomId + '/users/' + res1.body.data[0].user, 200, function(err, res2){
							if(err){ return done(err); }
							expect(res2.body.status).to.equal('OK');
				
							done();
						});					
					});					
				});				
		});	



     

  

		it( 'post room', function(done){
			  var room = {"name" : "testroom","timer" : 100,"roomsize" : 5,"started" : false}
		
			makePost('/rooms',room,201,function(err,res){
				if(err){return done(err);}
				expect(res.body.status).to.equal('OK');
				expect(res.body.data.name).to.not.be.null;		
				
				done();

			});
		});	


	});

	describe(' Stories' ,function(){
		it(' get ' , function(done){			
			makeRequest('/Stories', 200, function(err, res){
					if(err){ return done(err); }
					expect(res.body.status).to.equal('OK');
					expect(res.body.data).to.not.be.null;
				
					done();
			});
		});
		it(' get by id ', function(done){
				makeRequest('/Stories', 200, function(err, res){
					if(err){ return done(err); }
			
					makeRequest('/Stories/' + res.body.data[0]._id, 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});							
		});		
		it( 'post story', function(done){
			  var story = {name     : "drie biggetjes",   
			  variants    : [{
          			text : "er waren drie kleinen biggetjes in een huis. Het huis was rood met wittenstippen"
          		},
          		{
          			text : "er waren drie groote biggetjes in een huis. Het huis was rood met wittenstippen"
          		},
          		{
          		text : "er waren drie kleinen biggetjes in een huis. Het huis was wit met roodenstippen"
          		},
          		{
          			text : "er waren drie groote biggetjes in een huis. Het huis was wit met roodenstippen"
        		}],   
        max_num_players: 2
    }
		
			makePost('/stories',story,201,function(err,res){
				if(err){return done(err);}
				expect(res.body.status).to.equal('OK');
				expect(res.body.data.name).to.not.be.null;		
				
				done();

			});
		});	
	});
	describe(' users' ,function(){
		it(' get ' , function(done){			
			makeRequest('/users', 200, function(err, res){
					if(err){ return done(err); }
					expect(res.body.status).to.equal('OK');
					expect(res.body.data).to.not.be.null;
				
					done();
			});
		});
		it(' get by id ', function(done){
				makeRequest('/users', 200, function(err, res){
					if(err){ return done(err); }
			
					makeRequest('/users/' + res.body.data[0]._id, 200, function(err, res){
						if(err){ return done(err); }
						expect(res.body.status).to.equal('OK');
				
						done();
					});					
				});							
		});	
		it( 'post user', function(done){
			  var user = {"password": "te",
            "username": "te"			
   			}
		
			makePost('/users',user,201,function(err,res){
				if(err){return done(err);}
				expect(res.body.status).to.equal('OK');
				expect(res.body.data.username).to.not.be.null;		
				
				done();

			});
		});	

	});



});



/*
describe('without params', function(){
		it('should return todays date', function(done){
			var today = new Date();
			var expectedString = 
				(today.getDate < 10 ? '0' : '') + 
				today.getDate() + '-' + 
				(today.getMonth() + 1 < 10 ? '0' : '') + 
				(today.getMonth() + 1) + '-' + 
				today.getFullYear();

			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }

				expect(res.body).to.have.property('date');
				expect(res.body.date).to.not.be.undefined;
				expect(res.body.date).to.equal(expectedString);
				done();
			});
		});
	});
	*/