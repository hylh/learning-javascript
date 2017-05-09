var pg = require('pg');
pg.defaults.ssl = true;

const config = {
  user: 'hylh', //env var: PGUSER
  database: 'hero', //env var: PGDATABASE
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const connString = process.env.DATABASE_URL || config

exports.findById = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        var id = req.params.id;
        client
            .query('SELECT * FROM days WHERE id = $1', [id], function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                };
                res.send(result.rows);
        });
    });
};

exports.findMonthById = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        var id = req.params.id;
        client
            .query('SELECT * FROM days WHERE month_id = $1', [id], function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                };
                //console.log(result.rows);
                res.send(result.rows);
        });
    });
};

exports.listMonths = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err){
            return console.error('error fetching client from pool', err);
        };
        client.query('SELECT DISTINCT month_id FROM days ORDER BY month_id', function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            };
            //console.log(result.rows);
            res.send(result.rows);
        });
    })
};

exports.findAll = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        console.log('Retrieving every day');
        //Create something like "select * from somewhere"
        client.query('SELECT * FROM days', function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            };
            console.log('Sending result');
            //console.log(result);
            res.send(result.rows);
        });
    });
};

exports.addItem = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        console.log("Printing the body");
        console.log(req.body);
        let month = req.body.month;
        let day = req.body.day;
        let temperature = req.body.temperature;
        let humidity = req.body.humidity;
        let pressure = req.body.pressure;
        console.log('Adding month: ' + month + " Day: " + day + " Temp: " + temperature + " Humidity: " + humidity + " Pressure: " + pressure);
        //Create something like "pg insert ?"
        client
            .query('INSERT INTO days(month_id, day, temperature, humidity, pressure) VALUES($1, $2, $3, $4, $5) returning id', [month, day, temperature, humidity, pressure], function(err, result){
                done();
                if(err){
                    return console.error('error adding item', err);
                };
                console.log('Printing result');
                console.log(result);
                res.send(result);
        });
    });
}

exports.getLocation = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        client
            .query('SELECT * FROM location', function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                };
                res.send(result.rows);
        });
    });
}

exports.addLocation = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        console.log("Trying to delete");
        client.query('DELETE FROM location', function(err, result){
            if(err){
                //only release client if there is an error
                done();
                return console.error('error deleting rows', err);
            };
        });
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        console.log('Adding latitude: ' + latitude + ' longitude: ' + longitude);
        client
            .query('INSERT INTO location(latitude, longitude) VALUES($1, $2) returning id', [latitude, longitude], function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                };
                console.log('Added location');
                res.send(result.rows);
        });
    });
}