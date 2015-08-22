var app = angular.module("spec", ["ngClipboard"]);
 
app.config(['ngClipProvider', function(ngClipProvider) {
  ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
}]);

app.controller("specCtrl", function($scope, $sce) {
  $scope.rawInput = '';
  $scope.output = '';
  $scope.read = function() {
    $scope.output = $sce.trustAsHtml(marked($scope.rawInput));
  };
  //
  $scope.fallback = function(copy) {
      window.prompt('Press cmd+c to copy the text below.', copy);
    };
  //
});

app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});
