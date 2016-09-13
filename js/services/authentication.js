myApp.factory('Authentication', ['$rootScope', '$wilddogAuth', '$wilddogObject', '$location', 'WILDDOG_URL', function($rootScope, $wilddogAuth, $wilddogObject, $location, WILDDOG_URL) {

  var ref = new Wilddog(WILDDOG_URL);
  var auth = $wilddogAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Wilddog(WILDDOG_URL + 'users/' + authUser.uid);
      var userObj = $wilddogObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  return {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/success');
      }).
      catch (function(error) {
        $rootScope.message = error.message;
      });
    },
    //login

    logout: function() {
      return auth.$unauth();
    },
    //logout

    requireAuth: function() {
      return auth.$requireAuth();
    },
    //require Authentication

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Wilddog(WILDDOG_URL + 'users').child(regUser.uid).set({
          date: Wilddog.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
        }); //user info

        $rootScope.message = "Hi " + user.firstname + ", Thanks for registering";
      }).
      catch (function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };

}]); //factory