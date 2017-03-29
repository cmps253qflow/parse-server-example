
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define('getBadge', function(req, res) {
 var params = req.params;
     var theUser = req.params.theUser
     
     var badeQuery = new Parse.Query('_Installation');
	 badeQuery.equalTo('username', theUser);
	
	 badeQuery.find({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
		   for (var i = 0; i < count.length; i++) {
  
    var userData = count[i];
	
     res.success(userData.get('badge'));
     
   }
     
    });
});



Parse.Cloud.define('notifyNewAnswer', function(req, res) {
  
  console.log("We are in");
     var params = req.params;
     var selectedUsers = req.params.selectedUser
     
     var notiData = req.params.notiData
     var theUser = req.params.theUser
     var theUserData = req.params.theUserData
 
     var data = params.data
  
  
 var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.containedIn('username', selectedUsers);
	
	
	var badeQuery = new Parse.Query('_Installation');
	 badeQuery.containedIn('username', selectedUsers);
	
	 badeQuery.find({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
		   for (var i = 0; i < count.length; i++) {
  
    var userData = count[i];
    userData.increment('badge');
    userData.save(null, { useMasterKey: true });
	
    
     
   }
      res.success(count);
    });
	
	
	
	
  
  Parse.Push.send({
  where: pushQuery,
  data: {
    alert: data,
    badge: 1,
    sound: 'default'
  }
}, {
  useMasterKey: true,
  success: function() {
    console.log("YaY");
   res.success();
  },
  error: function(error) {
    res.error();
  }
});
	
	
	
	
	 var userQuery = new Parse.Query('_User');
  userQuery.containedIn('username', selectedUsers);
	 userQuery.find({
  success: function(results) {
 
  
 

   for (var i = 0; i < results.length; i++) {
  
	   
	   
	
    var userData = results[i];
	   var urs = userData.get('username');
	   if(urs === theUser){
		     userData.add('notifications',theUserData);
	   }else{
	   	     userData.add('notifications',notiData);
	   }
   
    userData.save(null, { useMasterKey: true });
	  
    
     
   }
    res.success('I passed on ');
   
     
  
  },

  error: function(error) {
    // error is an instance of Parse.Error.
  }
});
	
	
	
	
	
});

Parse.Cloud.define('incrementRep',function(request,response)
{    
  

var myUsername = request.params.myUsername
var reputation = request.params.reputation
	
  var userQuery = new Parse.Query('_User');
  userQuery.equalTo('username',myUsername);
  

  userQuery.first({ useMasterKey: true }).then((userData) => {
  console.log('before save');

    
         userData.increment("Reputation",reputation);
        
    return userData.save(null, { useMasterKey: true });
  }).then((userDataAgain) => {
    console.log('after save');
    response.success('whatever you want to return');
  }, (error) => {
    console.log(error);
    response.error(error);
  });
});
