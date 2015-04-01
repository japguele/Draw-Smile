module.exports = function(router, Images){

 
    router.route('/Images')
     .get(function(req, res){
        Images.find(function(err, Image){
            if(err){
                res.json({status : "ERROR", message: "Fout bij het ophalen van Images"});
                res.send(err);
            }
            res.status(200);
            res.json({status : "OK", message: "Ophalen gelukt", data: Image});
        });
    })
        .post(function(req, res){
        var images = new Images();
        images.image = req.body.image;
    
    

        images.save(function(err){
            if(err){
                res.json({status : "ERROR",  message: "Fout bij het aanmaken van een Images" });
                res.send(err);
            }else{
            res.status(201);
            res.json({status : "OK", message: "Images is aangemaakt", data : images});
             }
        });
    });
       

    router.route('/Images/:image_id')
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