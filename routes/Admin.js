module.exports = function(router){



router.get('/Admin',function(req,res){
	res.sendfile('views/index.html');
});
	
return router;
}