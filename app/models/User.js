
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({


        username     :  {type: String, required: true},
        password     :  {type: String, required: true},
        image 	: {type : Schema.Types.ObjectId, ref: 'images'},
        admin		 : {type: Boolean, required: false}

   

});

module.exports = mongoose.model('User', userSchema);
