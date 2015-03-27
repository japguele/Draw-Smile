
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({


        username     :  {type: String, required: true},
        password     :  {type: String, required: true},
        img          :  {type: String, required: false},
        admin		 : {type: Boolean, required: false}

   

});

module.exports = mongoose.model('User', userSchema);
