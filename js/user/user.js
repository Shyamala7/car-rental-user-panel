'use strict';

/* Controllers */

var userControllers = angular.module('userControllers', ['ngCookies']);

/*
*	Signup Controller
*
**/
userControllers.controller('signupCtrl', ['$scope', '$location', '$http', '$compile', 'Auth', 'API', '$cookies', 'Researches', 'Messages', 'ToastOptions', '$rootScope', '$route',
	function($scope, $location, $http, $compile, Auth, API, $cookies, Researches,Messages,ToastOptions, $rootScope, $route) {
		
		if(Auth.getUserId()){
			$location.path('/');
		}
		
		//Researches.CheckLoggedIn();
		
		$scope.newRegistration = function(){
			$("#submit").prop('disabled', true);
			$scope.url = 'site/10/signup';
			
			Researches.add($scope.url, $scope.registration).then(function (response) {
				console.log(response);
				if(response.code == 200){
					
					toastr.success(Messages.Sigup.Success, '', ToastOptions);
					Auth.isLoggedIn = true;
					Auth.user = response.data;
					$cookies.AuthUser = angular.toJson(Auth);
					$rootScope.logged_username = Auth.getUserName();
					$location.path("/createResearch");
					
				}else if(response.code == 404){
					
					toastr.error(Messages.Sigup.Invalid, '', ToastOptions);	
					$("#submit").prop('disabled', false);
				}else{
					toastr.error(Messages.Sigup.Error, '', ToastOptions);	
					$("#submit").prop('disabled', false);
				}
				
            });
			
		}
		
		$scope.signIn = function(){
			
			$("#submit").prop('disabled', true);
			$scope.url = 'user-verification';
			
			Researches.add($scope.url, $scope.signin).then(function (response) {
				console.log(response);
				if(response.code == 200){
					Auth.isLoggedIn = true;
					Auth.user = response.data;
					$cookies.AuthUser = angular.toJson(Auth);
					$rootScope.logged_username = Auth.getUserName();
					//console.log(Auth.getMailId());
					toastr.success(Messages.Authentication.Success, '', ToastOptions);
					$location.path('/home');
					
				}else if(response.code == 404){
					
					toastr.error(Messages.Authentication.Invalid, '', ToastOptions);					
					$route.reload();
				}
				
            });
		}
		
		
		//Cancel Create
		$scope.cancelCreate = function(){
			
			$location.path("/");
			
		}
	}
]);

/*
*	Logout Controller
*
**/

userControllers.controller('logoutCtrl', ['$scope', '$location', '$http', '$compile', 'Auth', 'API', '$cookies', 'Researches', '$rootScope',
	function($scope, $location, $http, $compile, Auth, API, $cookies, Researches, $rootScope) {
		 delete($cookies.AuthUser);
            Auth.isLoggedIn = false;
            Auth.basicSetupDone = false;
            Auth.user = {};
			$('.mainnav li:nth-child(2)').attr('style', 'display: none;');
			$('.mainnav li:nth-child(1)').attr('style', 'display: none;');
            $location.path('/');
	}
]);

userControllers.controller('homeCtrl', ['$scope', '$location', '$http', '$compile', 'Auth', 'API', '$cookies', 'Researches', '$rootScope',
	function($scope, $location, $http, $compile, Auth, API, $cookies, Researches, $rootScope) {
		Researches.checkLogin();
	}
]);
