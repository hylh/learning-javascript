var nfo;
var currentData = [];

$(document).ready(function(){
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
    chart.options.title.fontColor = "red";
    chart.options.data[0].dataPoints = currentData;
    chart.render();
}
