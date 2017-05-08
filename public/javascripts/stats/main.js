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
        createSelectButton();
    });
}

$('#mySelectDiv').on('change' , function(){
    let newMonth = $("#mySelectDiv option:selected").text();    
    let month = monthStringArray.indexOf(newMonth);
    updateChart(month);
});


function createSelectButton() {
    let div = document.getElementById("mySelectDiv");
    let select = document.createElement("select");
    select.id = "mySelect";
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

function getListOfMonths() {
    const searchString = '/model/month/';
    return $.get(searchString).then(function(data){
        return data;
    });
}