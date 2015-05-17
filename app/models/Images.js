
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// define the schema for our user model
var imagesSchema = mongoose.Schema({
       googledrive_id : {type: String,required: true},
       title : {type: String,required: true}
});


imagesSchema.methods.SaveImageTodrive = function SaveImageTodrive(image,googleapis,res) {

        //images.image = req.body.image;
        
        /*
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        
        fs.writeFile("images/out.png", base64Data, 'base64', function(err) {
          console.log(err);
        });*/

        var drive = googleapis.drive({ 
            version: 'v2', 
            auth: jwt 
        });

        drive.files.insert({
            resource: {
              title: 'Test',
              mimeType: 'image/jpeg',
              parents: [{
                id: folderID
              }]
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(image.path)
            }
          }, function (err, resp) {
              if (err) {
                console.log(err);
              } else {
                console.log("Saved to googledrive");
                images.googledrive_id = resp.id;
                images.title = 'Canvas image';

                images.save(function(err){
                    if(err){
                        res.json({status : "ERROR",  message: "Fout bij het aanmaken van een Images" });
                        res.send(err);
                    } else {
                        res.status(201);
                        res.json({status : "OK", message: "Images is aangemaakt", data : images});
                    }
                });
            }
          });
  //implementation code goes here
}



// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imagesSchema);
