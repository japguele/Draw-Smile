module.exports = function(router, Stories){ 
    router.route('/Stories')
        .post(function(req, res){

             
        var story = new Stories();
        story.name = req.body.name;
        story.max_num_players = req.body.max_num_players;
        story.variants = req.body.variants;
    

        story.save(function(err){
            if(err){
                res.json({status : "ERROR",  message: "Fout bij het aanmaken van een Stories" });
                res.send(err);
            }
            res.status(201);
            res.json({status : "OK", message: "Story is aangemaakt"});
        });
    })
        .get(function(req, res){
        Stories.find(function(err, story){
            if(err){
                res.json({status : "ERROR", message: "Fout bij het ophalen van Stories"});
                res.send(err);
            }
            res.status(200);
            res.json({status : "OK", message: "Ophalen gelukt", data: story});
        });
    });

    router.route('/Stories/:Story_id')
        .get(function(req, res){
            Stories.findById(req.params.Story_id, function(err, story){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van stories"});
                    res.send(err);
                }
                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: story});
            });
        })
       

    return router;

  
}