//service for pre-fetching all of the departments
app.factory("DepartmentService", function($http) {
  return {
    get: function() {
      return $http.get('/departments/list');
    }
  };
});

//service for pre-fetching all of the relevant tickets for current user
app.factory("TicketService", function($http, $rootScope) {
  return {
    get: function() {
	if($rootScope.isAdmin)
		return $http.get('/tickets/opened');
	else
		return $http.get('/tickets/my-tickets');
    }
  };
});

//service for displaying various messages to the user throughout the app
app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

//service for sharing data between controllers
app.service('SharedProperties', function(){
        var property = {};
	return{
            getProperty: function(key){
                return property.key;
            },
            setProperty: function(key, value){
                property.key = value;
            }
        };
});

//service for preserving session data
app.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
});

app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});
