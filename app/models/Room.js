// app/models/user.js
// load the things we need
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var roomSchema = mongoose.Schema({


        name     : String,
        users    : [{type: Schema.Types.ObjectId, ref: 'User'}],
        roomsize : Number,
        started  : Boolean

  

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Room', roomSchema);
