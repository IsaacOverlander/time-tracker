myApp.controller('EntryController', function ($http, $mdDialog, $mdToast) {
    const vm = this;
    // array for storing entries
    vm.entryList = [];
    // variable for getting time
    let timeSpent = 0;
    // array for storing project information
    vm.projectList = [];
    // variable for sortBy
    vm.sort = 'task';
    // variable to set reversed in sortBy
    vm.sortBool = false;
    // variable for changing form to an edit form
    vm.editBool = false;
    // variable for setting date input to today's date
    vm.date = new Date();
    // function for removing entries
    vm.deleteEntry = function (entry) {
        $mdDialog.show(
            $mdDialog.confirm()
                .title('Delete this task?')
                .textContent('You cannot undo this action')
                .ok('Delete')
                .cancel('Cancel')
        ).then(function () {
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
        }).catch(function (error) {
            console.log(error);
            $mdDialog.show(
                $md.alert()
                    .title('Error deleting task')
                    .ok('Okay')
            );
        });

    };
    // function for setting sort variables
    vm.sortFunction = function (sort) {
        vm.sort = sort;
        vm.sortBool = !vm.sortBool;
    }
    // function for adding/editing entries
    vm.addEntry = function () {
        const start = moment.utc(vm.start, 'HH:mm');
        const end = moment.utc(vm.end, 'HH:mm');
        timeSpent = moment.duration(end.diff(start));
        const hours = timeSpent._data.hours;
        const minutes = timeSpent._data.minutes;
        console.log(vm.date);
        
        vm.entryToAdd = {
            task: vm.task,
            date: vm.date,
            hours: hours,
            minutes: minutes,
            project: Number(vm.project),
            start: vm.start,
            end: vm.end
        }

        if (vm.editBool) {
            $http({
                method: 'PUT',
                url: '/task/entry/update/' + entryId,
                data: vm.entryToAdd
            }).then(function (response) {
                getEntries();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Entry Updated!')
                        .hideDelay(3000)
                );
                vm.editBool = false;
            }).catch(function (error) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Error editing Entry')
                        .ok('Okay')
                );
            });//End PUT
        }
        else {
            $http({
                method: 'POST',
                url: '/task/entry',
                data: vm.entryToAdd
            }).then(function (response) {
                getEntries();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Task Added!')
                        .hideDelay(3000)
                );
            }).catch(function (error) {
                console.log('Error creating task:', error);
            });//End POST
        }
        vm.start = ' ';
        vm.end = ' ';
        vm.task = ' ';
        vm.project = 0;
        vm.date = new Date();
    }
    // function for setting values when editing
    vm.editEntry = function (entry) {
        console.log('in edit');
        
        vm.editBool = !vm.editBool;

        
        if (vm.editBool) {
            vm.start = entry.start;
            vm.end = entry.end;
            vm.task = entry.task;
            vm.project = entry.projectid;
            vm.date = new Date(entry.date);
            entryId = entry.id;
        }
        else {
            vm.start = '';
            vm.end = '';
            vm.task = '';
            vm.project = '';
            vm.date = '';
        }
    }
    // function for GETting entry informtion
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
    // function for GETting project information
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
    // makes chart hidden on entries view
    document.getElementById("myChart").setAttribute('style', "display: none;");
    // calls to GET functions
    getProjects();
    getEntries();
});