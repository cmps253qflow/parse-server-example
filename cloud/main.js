
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('notifyNewAnswer', function(req, res) {
  
  console.log("We are in");
     var params = req.params;
     var selectedUsers = req.params.selectedUser
 
     var data = params.data
  
  
 var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.containedIn('username', selectedUsers);
  
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
});

Parse.Cloud.define('incrementRep',function(request,response)
{    
  

var myUsername = request.params.myUsername
var reputation = request.params.reputation
	
  var userQuery = new Parse.Query('_User');
  userQuery.equalTo('username',myUsername);
  

  userQuery.first({ useMasterKey: true }).then((userData) => {
  console.log('before save');
  console.log(userData.get('username') + ' is a king!');
    
    
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
