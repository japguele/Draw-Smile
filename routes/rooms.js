module.exports = function(router, Room){

    router.route('/rooms')
        .post(function(req, res){
            var room = new Room();
            room.name = req.body.name;
            room.timer = req.body.timer;
            room.story_id = req.body.story_id;
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
        .put(function(req,res){

            Room.findById(req.params.room_id, function(err, room){
                if(err) {
                    res.json({status : "ERROR", message: "Updaten niet gelukt"});
                    res.send(err);
                }


                if(req.body.name != null){                
                    room.name = req.body.name;
                }
                  if(req.body.timer != null){                
                    room.timer = req.body.timer;
                }
                  if(req.body.story_id != null){                
                    room.story_id = req.body.story_id;
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
          

                room.save(function(err){
                    if(err) res.send(err);

                    res.status(200);
                    res.json({status : "OK", message: "Updaten gelukt"});
                });
            });            
        });

    router.route('/rooms/:room_id/users/:user_id')
        .get(function(req, res){
              Room.findById(req.params.room_id,function(err, rooms){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                }
                var count;
                for (i = 0; i < rooms.users.length; i++) {
                   
                if(rooms.users[i].id == req.params.user_id){
                    count = i;
                }
                }
                console.log(count);


                 if(typeof count === 'undefined'){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    
                }else{


               
                   res.status(200);
                   res.json({status : "OK", message: "Ophalen gelukt", data: rooms.users[count]});

               }
               
              
            });
            /**
             * @todo implement the get route that wil return the user specific part of the story 
             */
        })
       
    
    return router;
}

