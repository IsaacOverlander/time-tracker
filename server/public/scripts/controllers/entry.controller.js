myApp.controller('EntryController', function ($http) {
    const vm = this;
    vm.entryList = [];
    let dateStarted = '';
    let timeSpent = 0;
   
    

    vm.addEntry = function (entry) {
        const month = vm.date.getMonth() + 1;
        const day = vm.date.getDate();
        const year = vm.date.getFullYear();
        dateStarted = ([month, day, year].join('/'));
        timeSpent = vm.end - vm.start;
        vm.entryToAdd = {
            task: vm.task,
            date: dateStarted,
            time: timeSpent
        }
        
        $http({
            method: 'POST',
            url: '/task',
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
            url: '/task'
        }).then(function (response) {
            vm.entryList = response.data;
            console.log(vm.entryList);

        }).catch(function (error) {
            console.log(error);
        });
    };

    getEntries();
});