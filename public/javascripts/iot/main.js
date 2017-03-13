var nfo;
var currentData = [];
// Example JSON data returned from your database
let data = {
    rows: [
        {
            firstName: 'Jill',
            lastName:  'Smith',
            age:       '22'
        },
        {
            firstName: 'Fred',
            lastName:  'Blogs',
            age:       '34'
        },
        {
            firstName: 'Brian',
            lastName:  'Jones',
            age:       '42'
        }
    ]
};

let htmlTableRows = ``;
let htmlTableTitle = "<thead><tr><th>Name</th><th>Last</th><th>Age</th></tr></thead>";

// Iterate of the rows in the data, use an ES6 "arrow function" to operate on each one
data.rows.forEach((row) => {
    // Use ES6 string template to create HTML table rows
    htmlTableRows += `<tr>
        <td>${row.firstName}</td>
        <td>${row.lastName}</td>
        <td>${row.age}</td>
    </tr>`;
});

// HTML for a table
var htmlTable = `<table class="table table-hover" style="width:100%">${htmlTableTitle}${htmlTableRows}</table>`;

console.log(htmlTable);

$(document).ready(function(){
    var $t = $('#tableContainer');
    $t.append(htmlTable);
    
    $('#get').click(function(event){
        $.get('/model', function(data){
            nfo = data;
        });
    });
    $('#view').click(function(event){
        for(i=0; i < nfo.length; i++){
            let day = nfo[i].day;
            let temp = nfo[i].temperature;
            let tuple = {x: day, y: temp};
            currentData.push(tuple);
        }
        console.log(currentData[0]);
    });
});




var chart = new CanvasJS.Chart("chartContainer");

window.onload = function () {
    //this gets the initial data from the router
    //let dates = local_data;
    //console.log(local_data);
    chart.options.title = {text: "Temperatures"};

    var dataStyle = {
        type: "line",
        name: "January",
        showInLegend: true
    };
/*
    var dataStyle2 = {
        type: "line",
        name: "February",
        showInLegend: true
    }
*/
    //chart.axisX.interval = 1;
    //chart.axisX.intervalType = "day";

    chart.options.data = [];
    chart.options.data.push(dataStyle);
    //chart.options.data.push(dataStyle2);


    // Date is (year, month, date, hours, minutes)
    // x: new Data(2017, 03, 01, 15, 10)
    
    dataStyle.dataPoints = [
        { x: 1, y: 10},
        { x: 2, y: 5},
        { x: 3, y: 12},
        { x: 4, y: 25},
        { x: 5, y: 22}
    ];

    chart.render();
}

var Update = function () {
    //Use jquery .replaceWith()
    chart.options.title.fontColor = "red";
    chart.options.data[0].dataPoints = currentData;
    chart.render();
}
