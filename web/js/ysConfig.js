angular.module('ysApp', ['ngMaterial'])
    .config(function($mdIconProvider){
        $mdIconProvider
            .icon("search","images/svg/search.svg",512);
    })

.controller('AppCtrl', function($scope) {
        $scope.googleUrl = 'http://google.com';

    });

