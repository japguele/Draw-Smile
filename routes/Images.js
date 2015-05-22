module.exports = function(router, Images){
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

        Images.SaveImageTodrive(req.body.image,req.body.name)
        //images.image = req.body.image;
        
        /*
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        
        fs.writeFile("images/out.png", base64Data, 'base64', function(err) {
          console.log(err);
        });*/

      

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
