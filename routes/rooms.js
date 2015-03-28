module.exports = function(router, Room){

    router.route('/')
        .post(function(req, res){
            var room = new Room();
            room.name = req.body.name;
            room.users = req.body.users;
            room.roomsize = req.body.roomsize;
            room.started = req.body.started;

            room.save(function(err){
                if(err){
                    res.json({status : "ERROR",  message: "Fout bij het aanmaken van een room" + err });
                    res.send(err);
                }
                res.status(201);
                res.json({status : "OK", message: "Room is aangemaakt"});
            });
        })
        .get(function(req, res){
            Room.find(function(err, rooms){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                }
                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: rooms});
            });
        });

    router.route('/:room_id')
        .get(function(req, res){
            Room.findById(req.params.room_id, function(err, room){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van room"});
                    res.send(err);
                }
                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: room});
            });
        })
        .put(function(req,res){

            Room.findById(req.params.room_id, function(err, room){
                if(err) {
                    res.json({status : "ERROR", message: "Updaten niet gelukt"});
                    res.send(err);
                }


                if(req.body.name != null){                
                    room.name = req.body.name;
                }
                
                if(req.body.users != null){                
                    room.users = req.body.users;
                }
                 if(req.body.roomsize != null){                
                     room.roomsize = req.body.roomsize;
                }
                if(req.body.started != null){                
                    room.started = req.body.started;
                }
                if(req.body.messages != null){                
                     room.messages = req.body.messages;
                }


                room.save(function(err){
                    if(err) res.send(err);

                    res.status(200);
                    res.json({status : "OK", message: "Updaten gelukt"});
                });
            });            
        });

    router.route('/:room_id/users/:user_id')
        .get(function(req, res){
            /**
             * @todo implement the get route that wil return the user specific part of the story 
             */
        })
        .post(function(req, res){
            var base64Data = req.body.image.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");
            require("fs").writeFile("room_images/"+ req.params.room_id +"/"+ req.params.room_id +"-out.png", base64Data, 'base64', function(err) {
                if (!err) {
                    res.send(200);
                }
    
            });
        })
    
    return router;
}

