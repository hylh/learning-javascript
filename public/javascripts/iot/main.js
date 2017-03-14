var chart = new CanvasJS.Chart("chartContainer");
const monthStringArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function createHTMLTable(data){
    let htmlTableRows = ``;
    let htmlTableTitle = "<thead><tr><th>Month</th><th>Day</th><th>Temperature</th></tr></thead>";
    let monthString;
    // Iterate of the rows in the data, use an ES6 "arrow function" to operate on each one
    data.forEach((row) => {
        // Use ES6 string template to create HTML table rows
        //need -1 because the month_id starts at 1
        monthString = monthStringArray[row.month_id - 1];
        htmlTableRows += `<tr>
            <td>${monthString}</td>
            <td>${row.day}</td>
            <td>${row.temperature}</td>
        </tr>`;
    });

    // HTML for a table
    let htmlTable = `<table class="table table-hover" style="width:100%">${htmlTableTitle}${htmlTableRows}</table>`;
    return htmlTable
}

function createChart(initialData){
    chart.options.title = {text: "Temperatures"};
    var dataStyle = {
        type: "line",
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
    
    dataStyle.dataPoints = initialData;
}

function getMonth(month){
    const searchString = '/model/month/' + month;
    return $.get(searchString).then(function(data){
        return data;
    });
}

function createMonthArray(month){
    let def = new $.Deferred();
    let monthArray = [];
    let day, temp, tuple;
    for(i=0; i < month.length; i++){
        day = month[i].day;
        temp = month[i].temperature;
        tuple = {x: day, y: temp};
        monthArray.push(tuple);
    }
    def.resolve(monthArray);
    return def.promise();
}

$(document).ready(function(){
    //Current month from 0-11
    let d = new Date();
    let currentMonth = d.getMonth();
    //Because currentMonth is from 0-11, we need to send in +1
    //for the month for the database
    getMonth(currentMonth + 1).then(function(month){
        //Create and view table
        let initialTable = createHTMLTable(month);
        $('#tableContainer').append(initialTable);
        //Create and view chart
        createMonthArray(month).then(function(monthArray){
        createChart(monthArray);
        chart.options.data[0].name = monthStringArray[currentMonth];
        chart.render();
      });  
    });

});

$(document.body).on('click', '.dropdown-menu li a', function (e) {
    let newMonth = $(this).text()
    let month = monthStringArray.indexOf(newMonth);
    update(month);
});

$('#get').click(function(event){
    console.log("What");
});
$('#view').click(function(event){
    console.log("old button");
});


function update(newMonth) {
    //This will need to define a month
    //months are from 0-11
    //let newMonth = 3
    chart.options.title.fontColor = "red";
    getMonth(newMonth + 1).then(function(month){
        let newTable = createHTMLTable(month);
        $('#tableContainer').replaceWith(newTable);
        createMonthArray(month).then(function(monthArray){
            chart.options.data[0].dataPoints = monthArray;
            console.log(newMonth);
            chart.options.data[0].name = monthStringArray[newMonth];
            chart.render();
        });
    });
}
