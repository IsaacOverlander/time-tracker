const myApp = angular.module('myApp', ['ngMaterial', 'ngRoute']);

//routes to each view
myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController as pc'
    }).when('/entries', {
        templateUrl: 'views/entry.html',
        controller: 'EntryController as ec'
    }).when('/reports', {
        templateUrl: "views/reports.html",
        controller: "ReportController as rc"
    }).otherwise({
        templateUrl: 'views/404.html'
    });
});
