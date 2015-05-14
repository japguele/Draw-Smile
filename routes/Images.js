module.exports = function(router, Images){
 router.route('/Images')
     .post(function(req, res){


        var images = new Images();
        var string = req.body.image;
        var array = string.match(/(.|[\r\1000]){1,1000}/g);
        for (var i = array.length - 1; i >= 0; i--) {
          images.image[i] = array[i]
        };
    

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