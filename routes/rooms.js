module.exports = function(router, Room , Images){

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
                res.json({status : "OK", message: "Room is aangemaakt", data: room});
            });
        })
        .get(function(req, res){
            
            Room.find()
                .populate('users.user')
                .exec(function(err, rooms){
                  if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                }


                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: rooms});
                });

                /*function(err, rooms){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                }


                rooms.populate('user_id').exec(function(err,c){
                    if(errr)
                    {
                        return console.log(err);
                    }
                console.log(c.user_id.username);

                });


                res.status(200);
                res.json({status : "OK", message: "Ophalen gelukt", data: rooms});
            });*/
        });

    router.route('/rooms/:room_id')
        .get(function(req, res){
              Room.findById(req.params.room_id)
                .populate('users.user')
                .exec(function(err, rooms){
                  if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                  }

                  res.status(200);
                  res.json({status : "OK", message: "Ophalen gelukt", data: rooms});
        
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
    router.route('/rooms/:room_id/users')
        .get(function(req,res){
             Room.findById(req.params.room_id,function(err, rooms){
                if(err){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
                }
                res.status(200);
                   res.json({status : "OK", message: "Ophalen gelukt", data: rooms.users});


            });

        })
        .post(function(req,res){
       
            Room.findByIdAndUpdate(req.params.room_id,
                {$push: {"users": {user: req.body.user ,story_part: req.body.story_part,completed: req.body.completed}}},  
             {safe: true, upsert: true},
              function(err, model) {
              if(err){
                 res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    res.send(err);
              }
             }
            );

           
                    res.status(200);
                    res.json({status : "OK", message: "Updaten gelukt", data:{user: req.body.user , story_part: req.body.story_part,completed: req.body.completed}});

          

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
                   
                if(rooms.users[i].user == req.params.user_id){
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
        .put(function(req,res){
            Room.findById(req.params.room_id,function(err, room){
                var count;
               for (i = 0; i < room.users.length; i++) {
                   
                if(room.users[i].user == req.params.user_id){
                    count = i;
                }
                }


                 if(typeof count === 'undefined'){
                    res.json({status : "ERROR", message: "Fout bij het ophalen van Rooms"});
                    
                }else{

                 room.markModified('users');

      

                    


                    if(req.body.story_part != null){                
                        room.users[count].story_part = req.body.story_part;
                    }
                    
                    if(req.body.completed != null){                
                       room.users[count].completed = req.body.completed;
                    }

                
                    if(req.body.image != null){      
                        var images = new Images();
                        images.image = req.body.image; 
                        images.save(function(err,image){
                            if(err){
                               res.json({status : "ERROR",  message: "Fout bij het aanmaken van een Images" });
                               res.send(err);
                            } 
                  
                            room.users[count].image = image._id;         
                            room.save(function(err){
                                if(err){ res.send(err)};
                                res.status(200);
                                res.json({status : "OK", message: "Updaten gelukt"});
                            });


                         });
                    }else{                                         
                        room.save(function(err){
                            if(err){ res.send(err)};
                            res.status(200);
                            res.json({status : "OK", message: "Updaten gelukt"});
                        });
                    }
                   

                }
                
            });
            
        })
       
    
    return router;
}

