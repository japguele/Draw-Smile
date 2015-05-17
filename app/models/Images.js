
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var imagesSchema = mongoose.Schema({
<<<<<<< HEAD
       googledrive_id : {type: String,required: true},
       title : {type: String,required: true}
=======
       image : [{type: String}]
>>>>>>> 111555edea5de5d8487cb5f02eb6e5bb1fd697fc
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imagesSchema);
