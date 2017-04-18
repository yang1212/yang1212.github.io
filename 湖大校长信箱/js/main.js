(function(){
    "use strict";
    var app = angular.module('myApp',['ngMaterial']);
    app.config(function($mdThemingProvider,$mdIconProvider){
        var huDaRed = $mdThemingProvider.extendPalette('red', {
            '500': '#c13432',
            'contrastDefaultColor': 'light'
        });
        $mdThemingProvider.definePalette('huRed', huDaRed);
        $mdThemingProvider.theme('default')
            .primaryPalette('huRed');
        $mdIconProvider
            .icon("headline","img/headline.svg", 512)
            .icon("star","img/star.svg", 512)
            .icon("star-white","img/star-white.svg", 512)
            .icon("note","img/note.svg", 512)
            .icon("note-yellow","img/note-yellow.svg", 512)
            .icon("search","img/search.svg", 512)
            .icon("equalizer","img/equalizer.svg", 512)
    });
    app.controller('loginController',['$scope',function($scope){
        $scope.form_data = {
            username:'',
            password:''
        };
        $scope.html = "�������";
        $scope.loginHu = function(){
            if($scope.form_data.username == 1 && $scope.form_data.password == 111){
                //ѧ������
                location.href = 'myMail.html';
            }else if($scope.form_data.username == 2 && $scope.form_data.password == 222){
                //У������
                location.href = 'headermaster.html'
            }else if($scope.form_data.username == 3 && $scope.form_data.password == 333){
                //��������
                location.href = 'department.html'
            }else if($scope.form_data.username == 4 && $scope.form_data.password == 444){
                //רԱ����
                location.href = 'commissioner.html'
            }else{
                alert('�������')
            }
        }
    }]);
    app.controller('dialogController',['$scope','$mdDialog',function($scope,$mdDialog){
        $scope.Cdrely = function(ev){
            $mdDialog.show({
                controller:Controller,
                templateUrl: 'CDreplyDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                openFrom:'#rejection',
                closeTo:'#rejection'
            })
        };
        $scope.check_drely= function(ev){
            $mdDialog.show({
                controller:Controller,
                templateUrl: 'checkDreply.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                openFrom:'#check_dreply',
                closeTo:'#check_dreply'
            })
        };
        function Controller($scope,$mdDialog){
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }
    }])
})();

