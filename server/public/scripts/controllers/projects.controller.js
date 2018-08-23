myApp.controller('ProjectsController', function($http) {
    const vm = this;
    vm.projectList = [];

    //TODO
    vm.addProject = function () {
        vm.projectToAdd = {
            name: vm.name
        }
        $http({
            method: 'POST',
            url: '/task/project',
            data: vm.projectToAdd
        }).then(function (response) {
            console.log('Project Added');
            getProjects();
        })
    }

    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project'
        }).then(function (response) {
            console.log(response.data);
            
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