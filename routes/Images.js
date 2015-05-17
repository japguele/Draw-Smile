module.exports = function(router, Images){
    /**
     * Init google api
     */
    var googleapis = require('googleapis');  

    var OAuth2 = googleapis.auth.OAuth2;  

    var folderID                    = '0ByBlhvMTqsYafmh1dlQwcEgzeHp1TW91TWhaYVIzMnpmT3lTMkNiRDhsQUlFR2dKM1YzdU0';

    var SERVICE_ACCOUNT_EMAIL       = '154170383487-575b5vrcbbq0n1fca42hqunhibskpjlt@developer.gserviceaccount.com';  
    var CLIENT_ID                   = '154170383487-575b5vrcbbq0n1fca42hqunhibskpjlt.apps.googleusercontent.com';  
    var SERVICE_ACCOUNT_KEY_FILE    = 'drawme-0121e0201c86.json';  
    var SCOPE = ['https://www.googleapis.com/auth/drive'];

    var jwt = new googleapis.auth.JWT(  
        SERVICE_ACCOUNT_EMAIL,    
        SERVICE_ACCOUNT_KEY_FILE,       
        null,
        SCOPE
    );
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
                res.json({status : "OK", message: "Ophalen gelukt", data: Image});
            });
        })
       

    return router;

  
}