app.run(function($rootScope, $location, $templateCache, AuthenticationService, FlashService){

	  var routesThatDontRequireAuth = ['/register'];
	  $rootScope.$on('$routeChangeStart', function(event, next, current) {
	  //if the route is only viewable to logged in users redirect user to login page
	    if(!_(routesThatDontRequireAuth).contains($location.path()) &&  !AuthenticationService.isLoggedIn()) {
	      $location.path('/login');
	      FlashService.show("Please log in to continue.");
	    }
	  });
	  
	  $rootScope.$on('$viewContentLoaded', function() {
	      $templateCache.removeAll();
	   });
});