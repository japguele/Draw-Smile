module.exports = function(router, Room){

 
    router.route('/rooms')
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

    router.route('/rooms/:room_id')
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
       

    return router;
}

