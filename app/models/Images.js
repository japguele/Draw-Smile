
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var imagesSchema = mongoose.Schema({
       googledrive_id : {type: String,required: true},
       title : {type: String,required: true}
       image : [{type: String}]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imagesSchema);
