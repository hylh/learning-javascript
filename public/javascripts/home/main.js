google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawGauge);

function drawGauge() {
    //Get todays data, then send it to the different functions
    let today = new Date();
    let currentMonth = today.getMonth();
    let t, h, p;

    //Because currentMonth is from 0-11, we need to send in +1
    //for the month for the database
    getMonth(currentMonth + 1).then(function(month){
        let latestDate = month.length - 1;
        t = month[latestDate].temperature;
        h = month[latestDate].humidity;
        p = month[latestDate].pressure;

        temp(t);
        humi(h);
        pres(p);
    });
}

function temp(value) {
    let options = {min: -20, max: 50, blueFrom: -20, blueTo: 0, yellowFrom: 25, yellowTo: 35,
    redFrom: 35, redTo: 50, minorTicks: 1};
    let data = new google.visualization.DataTable();
    data.addColumn("number", 'Temperature');
    data.addRows(1);
    data.setCell(0,0,value);
    let t = new google.visualization.Gauge(document.getElementById('temperature'));
    t.draw(data, options);
}

function humi(value) {
    let options = {min: 0, max: 100, yellowFrom: 85, yellowTo: 93,
    redFrom: 93, redTo: 100, minorTicks: 1};
    let data = new google.visualization.DataTable();
    data.addColumn("number", 'Humidity');
    data.addRows(1);
    data.setCell(0,0,value);
    let h = new google.visualization.Gauge(document.getElementById('humidity'));
    h.draw(data, options);
}

function pres(value) {
    let options = {min: 0, max: 1000, yellowFrom: 800, yellowTo: 900,
    redFrom: 900, redTo: 1000, minorTicks: 1};
    let data = new google.visualization.DataTable();
    data.addColumn("number", 'Pressure');
    data.addRows(1);
    data.setCell(0,0,value);
    let p = new google.visualization.Gauge(document.getElementById('pressure'));
    p.draw(data, options);
}

function getMonth(month){
    const searchString = '/model/month/' + month;
    return $.get(searchString).then(function(data){
        return data;
    });
}

