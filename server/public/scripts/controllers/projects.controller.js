myApp.controller('ProjectsController', function($http) {
    const vm = this;
    vm.projectList = [];

    //TODO
    vm.addProject = function (project) {
        console.log('In add project');
    }

    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project'
        }).then(function (response) {
            vm.projectList = response.data;
        }).catch(function (error) {
            console.log(error);
        });//End GET
    }

    vm.deleteProject = function(project) {
        $http({
            method: 'DELETE',
            url: '/task/project/' + project.id
        }).then(function (response) {
            console.log('Project Deleted');
            getProjects();
        }).catch(function (error) {
            console.log(error);
        });//End DELETE
    }

    getProjects();
});