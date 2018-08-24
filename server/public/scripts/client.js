const myApp = angular.module('myApp', ['ngMaterial', 'ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/entry.html',
        controller: 'EntryController as ec'
    }).when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController as pc'
    }).otherwise({
        templateUrl: 'views/404.html'
    });
});
