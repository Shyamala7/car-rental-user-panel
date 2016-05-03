'use strict';

/* Controllers */

var carControllers = angular.module('carControllers', ['ui.bootstrap']);


/*
*	Create New Product for Research Controller
*
**/
carControllers.controller('createCarCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		
		$scope.addCars = function() {
			
			$("#submit").prop('disabled', true);
			$scope.url = 'car-master-create';
			
			Researches.add($scope.url, $scope.addCar).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					$location.path("/car-master");
				}
				
			});
			
		}
		
		}
]);
carControllers.controller('viewCarCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		
		
			
			$scope.url = 'car-master-get';
			
			Researches.getAll($scope.url).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					$scope.cars = response.data;
				}
				
			});
			$scope.deleteCars = function(delete_id) {
				console.log(delete_id);
				$scope.cars = {car_id:""};
				$scope.cars.car_id = delete_id;
				
				$scope.url = 'car-master-delete';
				
				Researches.add($scope.url, $scope.cars).then(function (response) {
					console.log(response)
					if(response.code == 200) {
						//$location.path("/car-master");
						
						window.location.reload();
					}
					
				});
				
			}
		
		}
		
		
]);

carControllers.controller('editCarCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		console.log($routeParams.id);
		$scope.cars = {car_id:""};
		$scope.cars.car_id = $routeParams.id;
		
		$scope.url = 'car-master-edit';
			
			Researches.getDetail($scope.url, $scope.cars).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					//$location.path("/add-cars");
					
					$scope.addCar = response.data;
				}
				
			});
			
			
		$scope.addCars = function() {
			
			$("#submit").prop('disabled', true);
			$scope.url = 'car-master-update';
			
			Researches.add($scope.url, $scope.addCar).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					$location.path("/car-master");
				}
				
			});
			
		}
		
		}
]);