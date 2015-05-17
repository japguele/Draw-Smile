module.exports = function(router, Images,googleapis){
    /**
     * Init google api
     */
   
    //Init filestream reader
    var fs = require("fs");
 
    router.route('/')
     .get(function(req, res){
        Images.find(function(err, Image){
            if(err){
                res.json({status : "ERROR", message: "Fout bij het ophalen van Images"});
                res.send(err);
            }
            res.status(200);
            res.json({status : "OK", message: "Ophalen gelukt", data: Image});
        });
    }).post(function(req, res){
        var images = new Images();
        Images.SaveImageTodrive((req.files.image,googleapis,res);
        //images.image = req.body.image;
        
        /*
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        
        fs.writeFile("images/out.png", base64Data, 'base64', function(err) {
          console.log(err);
        });*/
/*
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
                body: fs.createReadStream(req.files.image.path)
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
*/
        /**/
    });
    
    router.route('/:image_id')
        .get(function(req, res){
            Images.findById(req.params.image_id, function(err, Image){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Images"});
                    res.send(err);
                }
                res.status(200);
                var string = "";
                for (var i = Image.image.length - 1; i >= 0; i--) {
                 string = string + Image.image[i]
                };
                Image.image = "";
                Image.image = string;
                res.json({status : "OK", message: "Ophalen gelukt", data: Image});
            });
        })
       

    return router;

  
}
