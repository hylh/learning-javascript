google.charts.load('current', {packages: ['corechart', 'table']});
google.charts.setOnLoadCallback(initialDrawChart);

//Easily have access to the chart object. 
var chart, table;

const monthStringArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

$(document).ready(function(){
    $('#clearSecond').hide();
});

$('#primaryMonth').on('change' , function(){
    let newMonth = $("#primaryMonth option:selected").text();    
    let month = monthStringArray.indexOf(newMonth);
    updateChart(month);
});

$('#clearSecond').click(function(event){
    let month = $("#primaryMonth option:selected").text();
    if(month == "Choose month"){
        month = 1; //set this to default (february)
    } else {
        month = monthStringArray.indexOf(month);
    };
    updateChart(month);

    $('#clearSecond').hide();
    $('#primaryMonthSelect').prop('disabled', false);
    $('#secondaryMonthSelect').prop('disabled', false);
});

$('#secondaryMonth').on('change', function(){
    let secondary = $("#secondaryMonth option:selected").text();
    secondary = monthStringArray.indexOf(secondary);
    getMonth(secondary + 1).then(function(secondaryData){
        let primary = $("#primaryMonth option:selected").text();
        if(primary == "Choose month"){
            primary = 1; //set this to default (february)
        } else {
            primary = monthStringArray.indexOf(primary);
        };
        getMonth(primary + 1).then(function(primaryData){
            //createComparissonTable(originMonthData, compMonthData);
            createDualChart(primaryData, secondaryData, primary, secondary);
        })
    });
    $('#primaryMonthSelect').prop('disabled', 'disabled');
    $('#secondaryMonthSelect').prop('disabled', 'disabled');
    $('#clearSecond').show();
});

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
    table.draw(data, null);
}

function updateChart(month) {
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
    getMonth(month + 1).then(function(monthData){
        data.addColumn('number', 'Day');
        data.addColumn('number', monthStringArray[month]);
        let rows = createChartRows(monthData);
        data.addRows(rows);
        chart.draw(data, options);
        table.draw(data, null);
    });
}

function initialDrawChart() {
    // Define the chart to be drawn.
    let data = new google.visualization.DataTable();
    let chartOptions = {
        'legend':'bottom',
        hAxis: {
            title: "Days"
        },
        vAxis: {
            title: "Temperature"
        }
    };
    
    let feb = 2;
    getMonth(feb).then(function(monthData){
        data.addColumn('number', 'Day');
        data.addColumn('number', monthStringArray[feb-1]);
        let rows = createChartRows(monthData);
        data.addRows(rows);
        table = new google.visualization.Table(document.getElementById('tableContainer'));
        chart = new google.visualization.LineChart(document.getElementById('chartContainer'));
        table.draw(data, null);
        chart.draw(data, chartOptions);
        createSelectButton("primaryMonth");
        createSelectButton("secondaryMonth");
    });
}

function createSelectButton(id) {
    let div = document.getElementById(id);
    let select = document.createElement("select");
    select.id = id + "Select";
    div.appendChild(select);
    getListOfMonths().then(function(monthList) {
        for(i=0; i < monthList.length; i++) {
            let option = document.createElement("option");
            option.value = monthStringArray[monthList[i].month_id - 1];
            option.text = monthStringArray[monthList[i].month_id - 1];
            select.appendChild(option);
        }
    });
}

function createChartRows(month) {
    let array = [];
    for(i=0; i < month.length; i++){
        array[i] = [month[i].day, Number(month[i].temperature)];
    }
    return array;
}

function createDualChartRows(month1, month2) {
    let array = [];
    for(i=0; i < month1.length; i++){
        if (month2[i] != null) {
            array[i] = [month1[i].day, Number(month1[i].temperature), Number(month2[i].temperature)];
        } else {
            array[i] = [month1[i].day, Number(month1[i].temperature), null];
        }
    }
    return array;
}

function getMonth(month){
    const searchString = '/model/month/' + month;
    return $.get(searchString).then(function(data){
        return data;
    });
}

function getListOfMonths() {
    const searchString = '/model/month/';
    return $.get(searchString).then(function(data){
        return data;
    });
}