

module.exports = function(router, User,Images){


    router.route('/')
        .post(function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;


        if(req.body.image != null){      
            var images = new Images();
            images.image = req.body.image; 
            images.save(function(err,image){
                 if(err){
                    res.json({
                        status : "ERROR",  
                        message: "Fout bij het aanmaken van een Images" 
                    });
                    
                    res.send(err);
                } 
                console.log(image._id);
                user.image = image._id;         
                user.save(function(err){
                    if(err){ res.send(err)};
                        res.status(201);
                        res.json({status : "OK", message: "user aangemaakt", data: user});
                    });
                });
        } else{
            user.save(function(err){
                if(err){ 
                    res.send(err);
                }
                res.status(201);
                res.json({status : "OK",  message: "user aangemaakt", data: user});
            });
        }
 		
    }).get(function(req, res){
            
        User.find(function(err, users){
            if(err){
                res.json({status : "ERROR", message: "Fout bij het ophalen van Users"});
                res.send(err);
            }
            res.status(200);
            res.json({status : "OK", message: "Ophalen gelukt", data: users});
        });
    });

    router.route('/:user_id')
        .get(function(req, res){
            User.findById(req.params.user_id, function(err, user){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van user"});
                    res.send(err);
                }
                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: user});
            });
        })
          .put(function(req,res){

            User.findById(req.params.user_id, function(err, user){
                if(err) {
                    res.json({status : "ERROR", message: "Updaten niet gelukt"});
                    res.send(err);
                }


                if(req.body.username != null){                
                    user.username = req.body.username;
                }
                
                if(req.body.password != null){                
                    user.password = req.body.password;
                }
           
                if(req.body.image != null){      
                        var images = new Images();
                        images.image = req.body.image; 
                        images.save(function(err,image){
                            if(err){
                               res.json({status : "ERROR",  message: "Fout bij het aanmaken van een Images" });
                               res.send(err);
                            } 
                            console.log(image._id);
                            user.image = image._id;         
                            user.save(function(err){
                                if(err){ res.send(err)};
                                res.status(200);
                                res.json({status : "OK", message: "Updaten gelukt", data:user});
                            });


                         });
       
                }else{
                     user.save(function(err){
                                if(err){ res.send(err)};
                                res.status(200);
                                res.json({status : "OK", message: "Updaten gelukt",data: user});
                            });
                }


        
                
            });            
        });

    router.route('/valid').post(function(req, res) {
        if (req.body.username != undefined && req.body.password != undefined) {
            var query = User.find({});
            query
                .where('username', req.body.username)
                .where('password', req.body.password)
                .limit(1)
                .exec(function(err, user) {
                    if(err){ 
                        res.send(err);
                    }

                    res.status(200);
                    res.json({
                        status : "OK", 
                        message : "Gebruiker gevonden", 
                        data : user[0]
                    });
                });
        }
    });

       

    return router;
}

