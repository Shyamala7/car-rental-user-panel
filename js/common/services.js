'use strict';

var Services = angular.module('researchServices', ['ngCookies','angularFileUpload']);

// service for Auth
Services.service('Auth', function($http, $cookies) {
	this.isLoggedIn = false;
	this.user = {};

	if (!!$cookies.AuthUser) {
		var _Auth = angular.fromJson($cookies.AuthUser);
		this.isLoggedIn = true;
		this.basicSetupDone = true;
		this.user = _Auth.user;
	}
	
	this.getUserId = function(){
		return this.user.id;
	};
	
	this.getUserName = function(){
		return this.user.name;
	};
	
	this.getMailId = function(){
		return this.user.email;
	};
});


// service for image upload
Services.service('ImageUpload', function($upload){
	this.upload = function(base64_file, files, research_id, user_id, product_name){
		//if (files && files.length) {
			//for (var i = 0; i < files.length; i++) {
				//var file = files[i];
				$upload.upload({
					url: 'upload.php',
					method: 'POST',
					fields: {'file':base64_file, 'file_name': files,'research_id': research_id, 'user_id': user_id, 'product_name': product_name},
					//file: file
				}).progress(function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					//console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
				}).success(function (data, status, headers, config) {
					console.log('file uploaded. Response: ' + data);
					return status;
				})/* .then(function(result){
					return result.data;
				}) */;
			//}
		//}
	};
	
	this.deleteImg = function(files, research_id, user_id, product_name){
		$upload.upload({
			url: 'delete.php',
			method: 'POST',
			fields: {'file_name': files,'research_id': research_id, 'user_id': user_id, 'product_name': product_name},
			//file: file
		}).progress(function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			//console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		}).success(function (data, status, headers, config) {
			console.log('file Deleted. Response: ' + data);
			return status;
		})
	}
});

// Service for calling Api
Services.service('Researches', function (API, Auth, $location, $rootScope) {
	this.add = function (url, parameter) {
		return API.post(url, parameter);
	};
	
	this.getAll = function (url) {
		return API.get(url);
	};
	
	this.getDetail = function (url, parameter) {
		return API.get(url, parameter);
	};
	
	this.CheckLoggedIn = function (){
		if(!Auth.getUserId()){
			$location.path('/');
		}
	};
	
	this.checkLogin = function(){
		if(Auth.getUserId()){
			this.userName();
			$('#logged_user_name').attr('style', 'display: block;');
			$('#log_out_link').attr('style', 'display: block;');
			$('#sigin_link').attr('style', 'display: none;');
			$('#registration_link').attr('style', 'display: none;');
		}else{
			$('#logged_user_name').attr('style', 'display: none;');
			$('#log_out_link').attr('style', 'display: none;');
			$('#sigin_link').attr('style', 'display: block;');
			$('#registration_link').attr('style', 'display: block;');
		}
	};
		
	
	this.userName = function(){
		$rootScope.logged_username = Auth.getUserName();
	};
});


// Service to call Web Service.
Services.service('API', function($http, $q, $cookies, $location, $rootScope, Auth, Config) {

       var host = Config.apiUrl;

        this.get = function(url, params) {

            var headers = {
                'signedInUserId': Auth.user.id,
                'accessToken': Auth.user.access_token
            };

            var deffered = $q.defer();

            $http({
                url: host + url,
                method: "GET",
                headers: headers,
                params: params
            }).success(function(response) {
			//	console.log(response);
				//return response;
                deffered.resolve(response);
            }).error(function(response) {
				return response;
                deffered.resolve('Error');
            });

            return deffered.promise;

        };
		
		this.post = function(url, data) {

            var headers = {
               'signedInUserId': Auth.user.id,
               'accessToken': Auth.user.access_token
            };
			
			$.extend(headers, {'Content-Type': 'application/json'});
			
            var deffered = $q.defer();

            $http({
                url: host + url,
                method: "POST",
                headers: headers,
                data: data,
            }).success(function(response) {
                deffered.resolve(response);
            }).error(function(response) {
                deffered.resolve('Error');
            });

            return deffered.promise;
        };
});

