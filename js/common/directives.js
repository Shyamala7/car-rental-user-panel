angular.module('iResearchApp.directives', [])
    .directive('pwCheck', [function () {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var firstPassword = '#' + attrs.pwCheck;
				elem.add(firstPassword).on('keyup', function () {
					scope.$apply(function () {
						// console.info(elem.val() === $(firstPassword).val());
						ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
					});
				});
			}
		}
	}]).directive('fileModel', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				
				element.bind('change', function(){
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}]).directive('starRating', function () {
			return {
				restrict: 'A',
				template: '<ul class="rating">' +
					'<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
					'\u2605' +
					'</li>' +
					'</ul>',
				scope: {
					min: '=',
					ratingValue: '=',
					max: '=',
					onRatingSelected: '&'
				},
				link: function (scope, elem, attrs) {

					scope.stars = [];
					
					for (var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled: i < scope.min
						});
					}
					
					var updateStars = function () {
						scope.stars = [];
						for (var i = 0; i < scope.max; i++) {
							scope.stars.push({
								filled: i < scope.ratingValue
							});
						}
					};

					scope.toggle = function (index) {
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating: index + 1
						});
					};

					scope.$watch('ratingValue', function (oldVal, newVal) {
						updateStars();
					});
				}
			}
		}).directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    })/* .directive("ngFileSelect",function(){

  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
      
    }
    
  }
  
  
}) */;