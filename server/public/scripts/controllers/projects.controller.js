myApp.controller('ProjectsController', function($http) {
    const vm = this;

    vm.addProject = function (project) {
        console.log('In add project');
    }

    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project'
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });//End GET
    }

    getProjects();
});