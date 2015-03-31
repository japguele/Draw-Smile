// app/models/user.js
// load the things we need
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var storiesSchema = mongoose.Schema({


        name     : {type : String , required: true},
 
        variants    : [{
          	text : {type :String}

        }],   
        max_num_players: Number


  

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Stories', storiesSchema);
