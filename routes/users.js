

module.exports = function(router, User){


    router.route('/')
        .post(function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.img = req.body.img;
 		 console.log(req.body);
        user.save(function(err){
            if(err){
                res.json({status : "ERROR",  message: "Fout bij het aanmaken van een user" + err});
                res.send(err);
            }
            res.status(201);
            res.json({status : "OK", message: "User is aangemaakt" + req.body.username});
        });
    })
        .get(function(req, res){
            
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
                 if(req.body.img != null){                
                     user.img = req.body.img;
                }
       


                user.save(function(err){
                    if(err) res.send(err);

                    res.status(200);
                    res.json({status : "OK", message: "Updaten gelukt"});
                });
            });            
        });

       

    return router;
}

