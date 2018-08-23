myApp.controller('EntryController', function ($http) {
    const vm = this;
    vm.entryList = [];

    //TODO
    vm.addEntry = function (entry) {
        const month = vm.date.getMonth() + 1;
        const day = vm.date.getDate();
        const year = vm.date.getFullYear();
        const dateStarted = ([month, day, year].join('/'));
        const timeSpent = vm.end - vm.start;
        console.log(timeSpent);
        

        vm.entryToAdd = {
            task: vm.task,
            date: dateStarted,
            time: timeSpent
        }
        console.log(vm.entryToAdd);
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