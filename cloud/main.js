
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('notifyNewAnswer', function(req, res) {
  
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
    // Push sent!
  },
  error: function(error) {
    // There was a problem :(
  }
});
});
