myApp.controller('ProjectsController', function ($http, $mdDialog, $mdToast) {
    const vm = this;
    // array for storing projects
    vm.projectList = [];
    //boolean for changing form to edit/add
    vm.projectEditBool = false;
    // variable for setting project input field when editing
    let projectUpdateId = 0;
    // makes chart hidden on projects view
    document.getElementById("myChart").setAttribute('style', "display: none;");
    
    // function for adding/updating projects
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
    //function for setting edit values in the form
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
    //function for GETting project information
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
    //function for removing projects
    vm.deleteProject = function (project) {
        console.log('in delete');
        if(project.hours > 0 || project.minutes > 0){
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Cannot delete a project with entries attached!')
                    .ok('Okay')
            );
        }
        else{
            $http({
                method: 'DELETE',
                url: '/task/project/' + project.projectid
            }).then(function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Project Deleted')
                        .hideDelay(3000)
                );
                console.log('Project Deleted');
                getProjects();
            }).catch(function (error) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Error deleting Project!')
                        .ok('Okay')
                );
                console.log(error);
            });//End DELETE
        }
    }
    //call to getProjects
    getProjects();
});