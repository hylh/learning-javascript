google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(initialDrawChart);

//Easily have access to the chart object. 
var chart;

const monthStringArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function createHTMLTable(data){
    let def = new $.Deferred();
    let htmlTableRows = ``;
    let htmlTableTitle = "<thead><tr><th>Month</th><th>Day</th><th>Temperature</th></tr></thead>";
    let monthString;
    // Iterate of the rows in the data, use an ES6 "arrow function" to operate on each one
    monthString = monthStringArray[data[0].month_id - 1];
    data.forEach((row) => {
        // Use ES6 string template to create HTML table rows
        //need -1 because the month_id starts at 1
        htmlTableRows += `<tr>
            <td>${monthString}</td>
            <td>${row.day}</td>
            <td>${row.temperature}</td>
        </tr>`;
    });

    // HTML for a table
    let htmlTable = `<table class="table table-hover" style="width:100%">${htmlTableTitle}${htmlTableRows}</table>`;
    def.resolve(htmlTable);
    return def.promise();
}

function createComparissonHTMLTable(originData, compData){
    let def = new $.Deferred();
    let htmlTableRows = ``;
    let htmlTableTitle = "<thead><tr><th>Month</th><th>Day</th><th>Temperature</th></tr></thead>";
    // Iterate of the rows in the data, use an ES6 "arrow function" to operate on each one
    let originMonthString = monthStringArray[originData[0].month_id - 1];
    let compMonthString = monthStringArray[compData[0].month_id - 1];
    let iteration = 0;
    let monthRow;
    let tempRow;

    let lengthOrigin = originData.length;
    let iterMax = compData.length;
    if (lengthOrigin < iterMax){
        iterMax = lengthOrigin;
    };

    originData.forEach((row) => {
        // Use ES6 string template to create HTML table rows
        //need -1 because the month_id starts at 1
        if(iteration < iterMax){
            monthRow = originMonthString + " vs " + compMonthString;
            tempRow = row.temperature + " - " + compData[iteration].temperature;
        } else {
            monthRow = originMonthString;
            tempRow = row.temperature;
        };
        htmlTableRows += `<tr>
            <td>${monthRow}</td>
            <td>${row.day}</td>
            <td>${tempRow}</td>
        </tr>`;
        iteration++;
    });

    // HTML for a table
    let htmlTable = `<table class="table table-hover" style="width:100%">${htmlTableTitle}${htmlTableRows}</table>`;
    def.resolve(htmlTable);
    return def.promise();
}

function getMonth(month){
    const searchString = '/model/month/' + month;
    return $.get(searchString).then(function(data){
        return data;
    });
}

$(document).ready(function(){
    $('select').selectpicker({
        style: 'btn-primary',
    });
    $('#primaryMonth').selectpicker({
        title: 'Choose month'
    });
    $('#secondaryMonth').selectpicker({
        title: 'Add comparison'
    });
    $('select').selectpicker('refresh');
    
    $('#clearSecond').hide();
    // Hide the clear button
    //Current month from 0-11
    //Because currentMonth is from 0-11, we need to send in +1
    //for the month for the database
    let feb = 2;
    getMonth(feb).then(function(month){
        if (month.length == 0) {
            //Because there is no data for the current month
            //This is a problem, TODO
            return;
        }
        //Create and view table
        createHTMLTable(month).then(function(table){
            $('#tableContainer').append(table);
        });
    });
});

$('#primaryMonth').on('change' , function(){
    let newMonth = $("#primaryMonth option:selected").text();    
    let month = monthStringArray.indexOf(newMonth);
    update(month);
});

$('#clearSecond').click(function(event){
    let month = $("#primaryMonth option:selected").text();
    if(month == "Choose month"){
        month = 1; //set this to default (february)
    } else {
        month = monthStringArray.indexOf(month);
    };
    getMonth(month + 1).then(function(monthData){
        updateTable(monthData);
        updateChart(monthData, month);
    });
    $('#clearSecond').hide();
    $('#secondaryMonth').attr('disabled', false);
    $('#secondaryMonth').selectpicker('refresh');
});

$('#secondaryMonth').on('change', function(){
    let newMonth = $("#secondaryMonth option:selected").text();
    let month = monthStringArray.indexOf(newMonth);
    getMonth(month + 1).then(function(compMonthData){
        newMonth = $("#primaryMonth option:selected").text();
        if(newMonth == "Choose month"){
            newMonth = 1; //set this to default (february)
        } else {
            newMonth = monthStringArray.indexOf(newMonth);
        };
        getMonth(newMonth + 1).then(function(originMonthData){
            createComparissonTable(originMonthData, compMonthData);
            createDualChart(originMonthData, compMonthData, month, newMonth)
        })
    });
    $('#secondaryMonth').attr('disabled', true);
    $('#secondaryMonth').selectpicker('refresh');
    $('#clearSecond').show();
});

function update(newMonth) {
    getMonth(newMonth + 1).then(function(monthData){
        updateChart(monthData, newMonth);
        updateTable(monthData);
    });
}

function createComparissonTable(originData, compData) {
    createComparissonHTMLTable(originData, compData).then(function(table){
        $('#tableContainer').html(table);
    });
}

function updateTable(monthData) {
    createHTMLTable(monthData).then(function(table){
        $('#tableContainer').html(table);
    });
}

function createDualChart(month1, month2, monthNumber1, monthNumber2) {
    let data = new google.visualization.DataTable();
    let options = {
        'legend':'bottom',
        hAxis: {
            title: "Days"
        },
        vAxis: {
            title: "Temperature"
        }
    };
    data.addColumn('number', 'Day');
    data.addColumn('number', monthStringArray[monthNumber1]);
    data.addColumn('number', monthStringArray[monthNumber2]);
    let rows = createDualChartRows(month1, month2);
    data.addRows(rows);
    chart.draw(data, options);
}

function updateChart(month, monthNumber) {
    let data = new google.visualization.DataTable();
    let options = {
        'legend':'bottom',
        hAxis: {
            title: "Days"
        },
        vAxis: {
            title: "Temperature"
        }
    };

    data.addColumn('number', 'Day');
    data.addColumn('number', monthStringArray[monthNumber]);
    let rows = createChartRows(month);
    data.addRows(rows);
    chart.draw(data, options);
}

function initialDrawChart() {
    // Define the chart to be drawn.
    let data = new google.visualization.DataTable();
    let options = {
        'legend':'bottom',
        hAxis: {
            title: "Days"
        },
        vAxis: {
            title: "Temperature"
        }
    };
    let feb = 2;
    getMonth(feb).then(function(month){
        data.addColumn('number', 'Day');
        data.addColumn('number', 'February');
        let rows = createChartRows(month);
        data.addRows(rows);
        chart = new google.visualization.LineChart(document.getElementById('chartContainer'));
        chart.draw(data, options);
    });
}

function createChartRows(month) {
    let array = [];
    for(i=0; i < month.length; i++){
        array[i] = [month[i].day, month[i].temperature];
    }
    return array;
}

function createDualChartRows(month1, month2) {
    let array = [];
    for(i=0; i < month1.length; i++){
        if (month2[i] != null) {
            array[i] = [month1[i].day, month1[i].temperature, month2[i].temperature];
        } else {
            array[i] = [month1[i].day, month1[i].temperature];
        }
    }
    return array;
}
