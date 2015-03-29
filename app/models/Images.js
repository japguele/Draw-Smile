
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var imagesSchema = mongoose.Schema({


       image : {type: String,required: true}


  

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imagesSchema);
