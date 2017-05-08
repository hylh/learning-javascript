google.charts.load('current', {packages: ['table']});
google.charts.setOnLoadCallback(initialDrawTable);

const monthStringArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var table;

function initialDrawTable() {
    // Define the chart to be drawn.
    let data = new google.visualization.DataTable();
    let feb = 2;
    getMonth(feb).then(function(monthData){
        data.addColumn('number', monthStringArray[feb-1]);
        data.addColumn('number', 'Temperature');
        data.addColumn('number', 'Humidity');
        data.addColumn('number', 'Pressure');
        let rows = createChartRows(monthData);
        data.addRows(rows);
        table = new google.visualization.Table(document.getElementById('table'));
        table.draw(data, null);
    });
}

$(document).ready(function(){
    $('select').selectpicker({
        style: 'btn-primary',
    });
    $('#primaryMonth').selectpicker({
        title: 'Choose month'
    });
});

$('#primaryMonth').on('change' , function(){
    let newMonth = $("#primaryMonth option:selected").text();    
    let month = monthStringArray.indexOf(newMonth);
    updateChart(month);
});

function updateChart(month) {
    let data = new google.visualization.DataTable();
    getMonth(month + 1).then(function(monthData){
       data.addColumn('number', monthStringArray[month]);
        data.addColumn('number', 'Temperature');
        data.addColumn('number', 'Humidity');
        data.addColumn('number', 'Pressure');
        let rows = createChartRows(monthData);
        data.addRows(rows);
        table.draw(data, null);
    });
}

function createChartRows(month) {
    let array = [];
    for(i=0; i < month.length; i++){
        array[i] = [month[i].day, Number(month[i].temperature), Number(month[i].humidity), Number(month[i].pressure)];
    }
    return array;
}

function getMonth(month){
    const searchString = '/model/month/' + month;
    return $.get(searchString).then(function(data){
        return data;
    });
}