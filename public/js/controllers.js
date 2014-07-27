app.controller("LoginController", function($scope, $location, $rootScope, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function(response) {
      $rootScope.isAdmin = (response.type == 'admin')? true : false;
      $location.path('/home');
    });
  };
  
  $scope.openTicket = function() {
      $location.path('/ticket');
  };
  
  $scope.go2register = function() {
      $location.path('/register');
  };
});

app.controller("DepartmentsController", function($scope, $http, $sanitize, $location, FlashService, departmentsList, SharedProperties) {
	$scope.departments = departmentsList.data.departments;
	$scope.departmentName = "";

	$scope.editDepartment = function(dept){
		SharedProperties.setProperty('department', dept);
		$location.path('/edit-department');
	};
	
	$scope.saveDepartment = function(){
		var res = $http.post("/departments/new", {title: $sanitize($scope.departmentName)});
	      res.success(FlashService.show('Successfully created'));
	      //res.error(FlashService.show('There was an error processing your request. Please try again.'));
	      $location.path('/departments');
	};
	
	$scope.updateDepartment = function(){
		var dep = SharedProperties.getProperty('department');
		var res = $http.post("/departments/update", {id: dep, title: $sanitize($scope.departmentName)});
	      res.success(FlashService.show('Successfully created'));
	      //res.error(FlashService.show('There was an error processing your request. Please try again.'));
		$location.path('/departments');
	};
});

app.controller("TicketController", function($scope, $http, $sanitize, $location, departmentsList, FlashService, SharedProperties, CSRF_TOKEN){
	$scope.ticket = SharedProperties.getProperty('ticket');
	$scope.selectedDepartment = $scope.ticket.department;
	$scope.departments = departmentsList.data.departments;
	
	$scope.sanitizeCredentials = function() {
	    return {
	      id: $sanitize($scope.ticket.id),
	      title: $sanitize($scope.ticket.title),
	      description: $sanitize($scope.ticket.description),
	      department: $scope.selectedDepartment,
	      status: $scope.ticket.status,
	      csrf_token: CSRF_TOKEN
	    };
	};
	
	$scope.createTicket = function(){
		var res = $http.post("/tickets/new", $scope.sanitizeCredentials());
	      res.success(FlashService.show('Successfully created'));
	      res.error(FlashService.show('There was an error processing your request. Please try again.'));
	      $location.path('/home');
	};
	
	$scope.closeTicket = function(){
		$scope.ticket.status = "closed";
		var res = $http.post("/tickets/update", $scope.sanitizeCredentials());
	      res.success(FlashService.show('The ticket is now closed'));
	     // res.error(FlashService.show('There was an error processing your request. Please try again.'));
	      $location.path('/home');
	};
});

app.controller("RegisterController", function($scope, $location, $http, $sanitize, FlashService, CSRF_TOKEN){
  $scope.regMessage = "";
  
  $scope.register = function(){
	if($scope.register.password != $scope.register.password2){
		$scope.regMessage = "Entered passwords don't match. Please enter the data again.";
		$location.path('/register');
	}
	else{
		var sanitizeCredentials = function() {
		    return {
		      email: $sanitize($scope.register.email),
		      password: $sanitize($scope.register.password),
		      csrf_token: CSRF_TOKEN
		    };
		  };
		var re = $http.post("/users/new", sanitizeCredentials());
		  
		re.success(function(){
			$location.path('/login');
			FlashService.show('Thank you for registering. You can now enter your credentials to log in.');
		});
		
		re.error(function(response){
			FlashService.show(response.flash);
		});
	}
  };
});

app.controller("HomeController", function($scope, $location, AuthenticationService, SharedProperties, ticketList) {
	$scope.tickets = ticketList.data.tickets;
  
	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/login');
		});
	};

	$scope.enterTicket = function(tickt) { 
		//saving selected ticket's data into a service so that another controller may use it
		SharedProperties.setProperty('ticket', tickt);
		$location.path('/ticket');
	};
	
	$scope.openTicket = function() { 
		$location.path('/ticket');
	};

	$scope.go2Departments = function() { 
		$location.path('/departments');
	};
});
