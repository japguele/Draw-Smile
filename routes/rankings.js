module.exports = function(router, Ranking){

 
    router.route('/rankings')
        .post(function(req, res){
        var ranking = new Ranking();
        ranking.score = req.body.score;
        ranking.room = req.body.room;
    

        ranking.save(function(err){
            if(err){
                res.json({status : "ERROR",  message: "Fout bij het aanmaken van een ranking" });
                res.send(err);
            }
            res.status(201);
            res.json({status : "OK", message: "Ranking is aangemaakt"});
        });
    })
        .get(function(req, res){
        Ranking.find(function(err, rankings){
            if(err){
                res.json({status : "ERROR", message: "Fout bij het ophalen van Rankings"});
                res.send(err);
            }
            res.status(200);
            res.json({status : "OK", message: "Ophalen gelukt", data: rankings});
        });
    });

    router.route('/rankings/:ranking_id')
        .get(function(req, res){
            Ranking.findById(req.params.ranking_id, function(err, ranking){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van ranking"});
                    res.send(err);
                }
                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: ranking});
            });
        })
       

    return router;
}

