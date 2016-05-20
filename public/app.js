var routerApp = angular.module('routerApp', ['ui.router','uiSwitch','rzModule']);

routerApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller:'HomeController'
        })

        .state('lang', {
        url: '/lang/:language',
        controller: 'views/settingsController',
        resolve: {
            jlptWords:['$http','$stateParams',function($http,$stateParams){
                return $http.get($stateParams.language).then(function(response){
                    return response.data;
                })
            }]
        },
         views: {
            '': { templateUrl: 'views/level-set.html',
            controller: 'settingsController'},
            'wordlist@lang': {templateUrl :'views/list.html'},
            'wordWiews@lang': {templateUrl: 'views/words.html'}
        }
   		})
}]);


routerApp.controller('settingsController',['$scope','jlptWords', function($scope,jlptWords){
	$scope.sorter      = false;
    $scope.wordListing = true;
    $scope.wordViews   = true;

    $scope.JlptLevels = {
        L5:false,
        L4:false,
        L3:false,
        L2:false
    };
    $scope.header = "Sort words";
    $scope.inverser = false;
    $scope.slider = {
        value: 100,
        options: {
        floor: 0,
        ceil: 500,
        step:20,
        showTicks:true
    }
    };
    
    $scope.jlptWords = jlptWords;

    $scope.limitWords = function(){
        var selectedWords = [];
        var selectedWordsLength = 0;
        var newHeader     = [];

        $.each($scope.JlptLevels, function(key, value){
                if(value === true){
                    if(jlptWords[key]){
                        
                        selectedWords.push({words:jlptWords[key],level:key});
                        selectedWordsLength +=  jlptWords[key].length;
                }
                newHeader.push(key);
            }
        });
        $scope.newHeader = newHeader;
        $scope.selectedWords = selectedWords;
        $scope.wordFilter = { inverse:$scope.inverser,
                              wordsPerPage:$scope.slider.value,
                              JlptLevels:$scope.JlptLevels,
                              selectedWords:selectedWords,
                              selectedWordsLength:selectedWordsLength
                            };
        $scope.sorter      = true;
        $scope.wordListing = false;
    }; 
    $scope.viewWords = function(e){
        var fromVal  = e.target.id - $scope.slider.value;
    $scope.wordQuery = {
        level:e.target.parentNode.id,
        from: fromVal,
        to:e.target.id
    };
    $scope.wordListing = true;
    $scope.wordViews   = false;
    }
    $scope.viewSorter = function(){
        $scope.sorter      = false;
        $scope.wordListing = true;
        $scope.wordViews   = true;
    }
    $scope.viewList = function(){
        $scope.sorter      = true;
        $scope.wordListing = false;
        $scope.wordViews   = true;
    }
    $scope.lastViewed = function(){
        $scope.sorter       = true;
        $scope.wordListing  = true;
        $scope.wordViews    = false;
    }
}]);

routerApp.controller('HomeController',function($scope,$state){
	$scope.formData = {};
    $scope.logValue = function(){
        $state.go($scope.formData.language)
    }
});

routerApp.directive('sibs', function() {
    return {
        link: function(scope, element, attrs){
            var secondAndThird = attrs.thirdword +" "+attrs.secondword;
            if(attrs.inverse == "true"){
                element[0].innerHTML = secondAndThird;
            } else {
                 element[0].innerHTML = attrs.firstword;
            }
           
            element.bind('click', function(){
                if(element[0].innerHTML === attrs.firstword){
                    element[0].innerHTML = secondAndThird;
                } else if(element[0].innerHTML === secondAndThird){
                    element[0].innerHTML = attrs.firstword;
                }
            })
        },
    }
});