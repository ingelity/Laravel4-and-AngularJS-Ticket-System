app.directive("clickedItem", function() {
  return function(scope, element, attrs){
      element.bind("click", function(){
        scope.$apply(attrs.fnc);
      });
    }
});