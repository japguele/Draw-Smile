
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var rankingSchema = mongoose.Schema({


        score     : Number,
        room    : { type : Schema.Types.ObjectId, ref: 'Room' },
       

   

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Ranking', rankingSchema);
