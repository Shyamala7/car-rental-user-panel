'use strict';

/* Controllers */

var customerControllers = angular.module('customerControllers', ['ui.bootstrap']);


/*
*	Create New Product for Research Controller
*
**/
customerControllers.controller('createCustomerCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		
		$scope.addCustomers = function() {
			
			//$("#submit").prop('disabled', true);
			$scope.url = 'customer-master-create';
			
			Researches.add($scope.url, $scope.addCustomer).then(function (response) {
				//console.log(response)
				if(response.code == 200) {
					$location.path("/customer-master");
				}
				
			});
			
		}
		
		}
]);
customerControllers.controller('viewCustomerCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		
		
			
			$scope.url = 'customer-master-get';
			
			Researches.getAll($scope.url).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					$scope.customers = response.data;
				}
				
			});
			$scope.deleteCustomers = function(delete_id) {
				console.log(delete_id);
				$scope.customers = {customer_id:""};
				$scope.customers.customer_id = delete_id;
				
				$scope.url = 'customer-master-delete';
				
				Researches.add($scope.url, $scope.customers).then(function (response) {
					console.log(response)
					if(response.code == 200) {
						//$location.path("/car-master");
						
						window.location.reload();
					}
					
				});
				
			}
		
		}
		
		
]);

customerControllers.controller('editCustomerCtrl', ['$scope', '$location', 'API', 'Auth', 'Researches', '$routeParams', '$window', 'ToastOptions', 'Messages', 
	function($scope, $location, API, Auth, Researches, $routeParams ,$window, ToastOptions, Messages) {
		console.log($routeParams.id);
		$scope.customers = {customer_id:""};
		$scope.customers.customer_id = $routeParams.id;
		
		$scope.url = 'customer-master-edit';
			
			Researches.getDetail($scope.url, $scope.customers).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					//$location.path("/add-cars");
					
					$scope.addCustomer = response.data;
				}
				
			});
			
			
		$scope.addCustomers = function() {
			
			$("#submit").prop('disabled', true);
			$scope.url = 'customer-master-update';
			
			Researches.add($scope.url, $scope.addCustomer).then(function (response) {
				console.log(response)
				if(response.code == 200) {
					$location.path("/customer-master");
				}
				
			});
			
		}
		
		}
]);