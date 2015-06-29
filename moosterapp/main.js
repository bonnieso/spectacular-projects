'use strict';

var moosterApp = angular.module('mooster', ["ngRoute", "firebase"]);

moosterApp.run(function($rootScope, $firebaseAuth, $window) {
    $rootScope.fbRef = new $window.Firebase("https://mooster.firebaseio.com");
    $rootScope.afAuth = $firebaseAuth($rootScope.fbRef);
})

moosterApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'helloCtrl',
    templateUrl: 'hello.html'
  })
  .when('/signup', {
    controller: 'signupCtrl',
    templateUrl: 'signup.html'
  })
  .when('/login', {
    controller: 'loginCtrl',
    templateUrl: 'login.html'
  })
  .when('/compose', {
    controller: 'composeCtrl',
    templateUrl: 'compose.html',
    resolve: {
     currentAuth:  function(Auth){
       return Auth.$requireAuth();
     }
    }
  })
  .when('/profile', {
    controller: 'profileCtrl',
    templateUrl: 'profile.html',
    resolve: {
     currentAuth:  function(Auth){
       return Auth.$requireAuth();
     }
   }
  })
  .otherwise({
    redirectTo: '/'
  })
});

moosterApp.factory("Auth", function($firebaseAuth){
 var ref = new Firebase("https://mooster.firebaseio.com/");
 return $firebaseAuth(ref);
});

moosterApp.controller("signupCtrl", function($scope, $rootScope, $firebaseObject, $location) {
  
  $scope.signup = function(user) {
    $rootScope.afAuth.$createUser({
      email    : $scope.email,
      password : $scope.password
    }).then(function(userData) {
      console.log("Successfully signed up!");
      $location.path("/login");
    }).catch(function(error){
      console.log(error);
    });
  };
    
});

moosterApp.controller("loginCtrl", function($scope, $firebaseObject, $rootScope, $location) {
  $scope.login = function(){
    
    //authenticate user
    $rootScope.afAuth.$authWithPassword({
      email    : $scope.email,
      password : $scope.password
    }).then(function(authData) {
      console.log("Successfully logged in!");
      if(authData){
        
        $rootScope.authID = authData.uid;
        $rootScope.activeUser = $rootScope.fbRef.child('users/' + authData.uid);
        $rootScope.afUser = $firebaseObject($rootScope.activeUser);
        $rootScope.afUser.email = $scope.email;
        if (!$rootScope.activeUser){
        $rootScope.afUser.$save();
        }
        $location.path("/profile");  
      } else{
        //user logged out
        console.log("Logged out.");
      }
    }).catch(function(error){
      console.log(error);
    });
  };
});

moosterApp.controller("composeCtrl", function($scope, $rootScope, $firebaseObject, $firebaseArray, $location) {
  $scope.newMoo = "";
  var tweetLimit = 140;
  
  $scope.remainingCount = function(){
    return tweetLimit-$scope.newMoo.length;
  }
  
  $scope.isTweetMaxed = function(){
    return $scope.remainingCount() < 0;
  }
  
  $scope.username = $rootScope.afUser.username;
  
  $scope.logout = function(){
    $rootScope.afAuth.$unauth();
    $location.path("/");
  };
  
  $scope.mooArray = $firebaseArray($rootScope.fbRef.child("users").child($rootScope.authID).child("Moos"));
  
    $scope.createMoo = function(){
      $scope.mooArray.$add({
        text: $scope.newMoo
      });
    };
});

moosterApp.controller("profileCtrl", function($scope, $location, $rootScope) {
  
  $scope.logout = function(){
    $rootScope.afAuth.$unauth();
    $location.path("/");
  };
  
  $scope.userEmail = $rootScope.afUser.email;
  $scope.username = $rootScope.afUser.username;
  
  $scope.updateProfile = function(){
    $rootScope.afUser.email = $scope.userEmail;
    $rootScope.afUser.username = $scope.username;
    $rootScope.afUser.$save();
    console.log("Updated!");
  };
  
});

moosterApp.controller("helloCtrl", function($scope, $location) {
  $scope.goSignup = function(){
    $location.path("/signup");
  };
  $scope.goLogin = function(){
    $location.path("/login");
  };
});

moosterApp.controller("mainCtrl", function($scope, $location, $rootScope, $firebaseObject) {

});
