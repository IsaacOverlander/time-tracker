const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/entry.html'
    }).when('/projects', {
        templateUrl: 'views/projects.html'
    }).otherwise({
        templateUrl: 'views/404.html'
    });
})