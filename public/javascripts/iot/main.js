var chart = new CanvasJS.Chart("chartContainer");

window.onload = function () {
    let dates = local_data;
    console.log(local_data);
    chart.options.title = {text: "Some Chart title"};

    var dataStyle = {
        type: "line",
        name: "January",
        showInLegend: true
    };

    var dataStyle2 = {
        type: "line",
        name: "February",
        showInLegend: true
    }
    //chart.axisX.interval = 1;
    //chart.axisX.intervalType = "day";

    chart.options.data = [];
    //chart.options.data.push(dataStyle);
    chart.options.data.push(dataStyle2);


    // Date is (year, month, date, hours, minutes)
    dataStyle2.dataPoints = [
        local_data
    ];


/*  
    const array = [
    { x: new Date(2017, 03, 01, 15, 15), y: 5},
    { x: new Date(2017, 03, 02, 15, 15), y: 10},
    { x: new Date(2017, 03, 03, 15, 15), y: 15},
    { x: new Date(2017, 03, 04, 15, 15), y: 20},
    { x: new Date(2017, 03, 05, 15, 15), y: 25}
    ];
*/

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
    chart.options.data[0].dataPoints[3].y = 3;
    chart.render();
}