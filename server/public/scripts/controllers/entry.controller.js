myApp.controller('EntryController', function ($http) {
    const vm = this;
    vm.entryList = [];
    let dateStarted = '';
    let timeSpent = 0;
    vm.projectList = []
   
    vm.deleteEntry = function (entry) {
        $http({
            method: 'DELETE',
            url: '/task/entry/' + entry.id
        }).then(function (response) {
            console.log('Entry Deleted');
            getEntries();
        }).catch(function (error) {
            console.log(error);
        });//End DELETE
    };

    vm.addEntry = function () {
        // //date variables
        // const month = vm.date.getMonth() + 1;
        // const day = vm.date.getDate();
        // const year = vm.date.getFullYear();
        // dateStarted = ([month, day, year].join('/'));
        //Time variables
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
            console.log('Task created');
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