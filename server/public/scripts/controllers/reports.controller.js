myApp.controller("ReportController", function ($http, $mdDialog, $mdToast) {
    console.log('ReportController Reporting');
    const vm = this;
    // array to store project information
    vm.projectList = [];
    // array to store project names for chart
    let projectNames = []
    //array to store project times for chart
    let projectTime = []
    // Makes chart visible in report view
    document.getElementById("myChart").setAttribute('style', "display: block;");
    getProjects();

    // GETs project data to use in the chart
    function getProjects() {
        $http({
            method: 'GET',
            url: '/task/project/data'
        }).then(function (response) {
            vm.projectList = response.data;
            setValues();
        }).catch(function (error) {
            console.log(error);
        });//End GET
    }
    // sets chart values
    function setValues() {

        for (let project of vm.projectList) {
            projectNames.push(project.name)
            let time = Number(project.hours + '.' + project.minutes);
            projectTime.push(time);
        }
        console.log(projectTime);

        let ctx = document.getElementById("myChart").getContext('2d');
        console.log(ctx);
        
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: projectNames,
                datasets: [{
                    label: 'Hours Spent',
                    data: projectTime,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    
});

