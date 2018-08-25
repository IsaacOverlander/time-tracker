myApp.controller('ProjectsController', function ($http, $mdDialog, $mdToast) {
    const vm = this;
    vm.projectList = [];
    vm.projectEditBool = false;
    let projectUpdateId = 0;

    //TODO
    vm.addProject = function () {
        vm.projectToAdd = {
            name: vm.name
        }
        if (vm.projectEditBool) {
            $http({
                method: 'PUT',
                url: '/task/project/update/' + projectUpdateId,
                data: vm.projectToAdd
            }).then(function(response) {
                $mdToast.show(
                    $mdToast.simple()   
                        .textContent('Project updated!')
                        .hideDelay(3000)
                );
                vm.projectEditBool = false;
                getProjects();
                vm.name = '';
            }).catch(function(error) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Error editin project!')
                        .ok('Okay')
                );
            });//End PUT
        }
        else {
            $http({
                method: 'POST',
                url: '/task/project',
                data: vm.projectToAdd
            }).then(function (response) {
                vm.name = '';
                console.log('Project Added');
                getProjects();
            })
        }
    }

    vm.editProject = function (project) {
        vm.projectEditBool = !vm.projectEditBool;
        if (vm.projectEditBool) {
            vm.name = project.name;
            projectUpdateId = project.projectid;
        }
        else {
            vm.name = '';
        }
    }

    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project/data'
        }).then(function (response) {
            vm.projectList = response.data;
        }).catch(function (error) {
            console.log(error);
        });//End GET
    }

    vm.deleteProject = function (project) {
        console.log('in delete');
        $http({
            method: 'DELETE',
            url: '/task/project/' + project.projectid
        }).then(function (response) {
            console.log('Project Deleted');
            getProjects();
        }).catch(function (error) {
            console.log(error);
        });//End DELETE
    }

    getProjects();
});