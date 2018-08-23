myApp.controller('EntryController', function ($http) {
    const vm = this;


    vm.addEntry = function (entry) {
        const month = vm.date.getMonth() + 1;
        const day = vm.date.getDate();
        const year = vm.date.getFullYear();
        const dateStarted = ([month, day, year].join('/'));
        const timeSpent = vm.end - vm.start;
        console.log(timeSpent);
        

        vm.entryToAdd = {
            description: vm.description,
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
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    };

    getEntries();
});