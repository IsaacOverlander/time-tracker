myApp.controller('EntryController', function ($http) {
    const vm = this;




    vm.addEntry = function (entry) {
        const month = vm.date.getMonth() + 1;
        const day = vm.date.getDate();
        const year = vm.date.getFullYear();
        const dateStarted = ([month, day, year].join('/'));

        vm.entryToAdd = {
            description: vm.description,
            date: dateStarted,
            start: Number(vm.start),
            end: Number(vm.end),
        }
        console.log(vm.entryToAdd);
    }


    console.log('Entries');
});