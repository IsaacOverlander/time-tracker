myApp.controller('ProjectsController', function($http) {
    const vm = this;
    vm.projectList = [];

    vm.addProject = function (project) {
        console.log('In add project');
    }

    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project'
        }).then(function (response) {
            vm.projectList = response.data;
            getProjects();
        }).catch(function (error) {
            console.log(error);
        });//End GET
    }

    getProjects();
});