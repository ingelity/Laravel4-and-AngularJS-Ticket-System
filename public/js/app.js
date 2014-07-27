var app = angular.module("app", ['ngSanitize']);

app.config(function($httpProvider) {
//keeping track of whether user's session timed out and if so redirect him to login page
  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
    var success = function(response) {
      return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/login');
        FlashService.show(response.data.flash);
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
});

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });
  
  $routeProvider.when('/register', {
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  });
  
  $routeProvider.when('/ticket', {
    templateUrl: 'templates/ticket.html',
    controller: 'TicketController',
    resolve: {
      departmentsList : function(DepartmentService) {
        return DepartmentService.get();
      }
    }
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController',
    resolve: {
      ticketList : function(TicketService) {
        return TicketService.get();
      }
    }
  });

  $routeProvider.when('/departments', {
    templateUrl: 'templates/departments.html',
    controller: 'DepartmentsController',
    resolve: {
      departmentsList : function(DepartmentService) {
        return DepartmentService.get();
      }
    }
  });
  
  $routeProvider.when('/edit-department', {
    templateUrl: 'templates/editDepartment.html',
    controller: 'DepartmentsController'
  });

  $routeProvider.otherwise({ redirectTo: '/login' });
});