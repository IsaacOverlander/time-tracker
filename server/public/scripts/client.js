const myApp = angular.module('myApp', ['ngMaterial', 'ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/entry.html',
        controller: 'EntryController as ec'
    }).when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController as pc'
    }).when('/reports', {
        templateUrl: "views/reports.html",
        controller: "ReportController as rc"
    }).otherwise({
        templateUrl: 'views/404.html'
    });
});
