var app = angular.module("spec", ["ngClipboard"]);

app.config(['ngClipProvider', function(ngClipProvider) {
  ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
}]);

app.controller("specCtrl", function($scope, $sce) {
  var preview = "### Headers\n# h1\n## h2\n### h3\n\n### Bulleted lists\n* Snowflakes\n* Bunnies\n* Unicorns\n\n### Ordered Lists\n1. Rainbows\n2. Sprinkles\n3. Cupcakes\n\n### Links\nThis is [an example](http://www.google.com/) of a link.\n\n### Code Blocks\n    4 leading spaces make a code block";
  $scope.rawInput = preview;
  $scope.output = '';

  $scope.init = function(){
    $scope.output = $sce.trustAsHtml(marked($scope.rawInput));
  };

  $scope.read = function() {
    $scope.output = $sce.trustAsHtml(marked($scope.rawInput));
  };
  // $scope.fallback = function(copy) {
  //     window.prompt('Press cmd+c to copy the text below.', copy);
  //   };
  $scope.copied = function(){
    swal("Copied!", "Your markdown is copied and ready to paste.", "success");
  };
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
