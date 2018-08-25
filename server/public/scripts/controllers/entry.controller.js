myApp.controller('EntryController', function ($http, $mdDialog, $mdToast) {
    const vm = this;
    vm.entryList = [];
    let timeSpent = 0;
    vm.projectList = [];
    vm.sort = 'task';
    vm.bool = false;
   
    vm.deleteEntry = function (entry) {
        $mdDialog.show(
            $mdDialog.confirm()
                .title('Delete this task?')
                .textContent('You cannot undo this action')
                .ok('Delete')
                .cancel('Cancel')
        ).then(function() {
            $http({
                method: 'DELETE',
                url: '/task/entry/' + entry.id
            }).then(function (response) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Task Deleted!')
                    .hideDelay(3000)
                );
                console.log('Entry Deleted');
                getEntries();
            }).catch(function (error) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Cannot delete a project with tasks')
                        .ok('Okay')
                );
                console.log(error);
            });//End DELETE
        }).catch(function(error) {
            console.log(error);
            $mdDialog.show(
                $md.alert()
                    .title('Error deleting task')
                    .ok('Okay')
            );
        });
        
    };

    vm.sortFunction = function(sort) {
        vm.sort = sort;
        vm.bool = !vm.bool;
    }

    vm.addEntry = function () {
        const start = moment.utc(vm.start, 'HH:mm');
        const end = moment.utc(vm.end, 'HH:mm');
        timeSpent = moment.duration(end.diff(start));
        const hours = timeSpent._data.hours;
        const minutes = timeSpent._data.minutes;
        
                
        vm.entryToAdd = {
            task: vm.task,
            date: vm.date,
            hours: hours,
            minutes: minutes,
            project: Number(vm.project)
        }
        
        $http({
            method: 'POST',
            url: '/task/entry',
            data: vm.entryToAdd
        }).then(function(response) {
            getEntries();
            $mdToast.show(
                $mdToast.simple()
                .textContent('Task Added!')
                .hideDelay(3000)
            );
            vm.start = '';
            vm.end = '';
            vm.task = '';
            vm.project = '';
            vm.date = '';
        }).catch(function (error) {
            console.log('Error creating task:', error);
        });//End POST
    }

    function getEntries() {
        $http({
            method: 'GET',
            url: '/task/entry'
        }).then(function (response) {
            vm.entryList = response.data;
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Error adding task')
                    .ok('Okay')
            );
        });
    };

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

    getProjects();
    getEntries();
});