myApp.controller('RegistrationController',
  ['$scope', 'Authentication',
  function($scope, Authentication) {
  
  $scope.login = function() {
    Authentication.login($scope.user);
  }; //login

  $scope.logout = function() {
    Authentication.logout();
  }; //logout

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register

  // $scope.validateAdmin = function(input) { //check if the admin has input the correct admin key
  // 	if (input === '00986543') {
  // 		$scope.myform.adminKey.$setValidity("invalid", true); //$setValidity(vaildationErrorKey, isVaild) 
  // 															 //isValid is to check the current input's validation, not the ErrorKey's validation
  // 															 //the input === '00986543' is true => the invalid property is false(as the validation becomes true).
  // 	} else {
		// $scope.myform.adminKey.$setValidity("invalid", false);
  // 	}
  // }; // validateAdmin

}]); // Controller