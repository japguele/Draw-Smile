// app/models/user.js
// load the things we need
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var roomSchema = mongoose.Schema({


        name     : {type :String , required: true},
        timer 	 : {type : Number},
        story_id : {type : Schema.Types.ObjectId, ref: 'stories'},
        users    : [{
        	user_id : {type : Schema.Types.ObjectId, ref: 'User'},
        	image 	: {type : Schema.Types.ObjectId, ref: 'images'},
        	story_part : {type : Number},
        	completed : {type : Boolean}


        }],
        roomsize : Number,
        started  : Boolean


  

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Room', roomSchema);
