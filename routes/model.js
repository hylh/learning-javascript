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
        console.log('Retrieving: ' + id);
        //Create something like "select id from somewhere"
        client
            .query('SELECT * FROM days WHERE id = $1', [id], function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                };
                console.log('Printing result');
                console.log(result.rows[0]);
                res.send(result);
        });
    });
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
            console.log('Printing result');
            console.log(result);
            res.send(result.rows);
        });
    });
};

exports.addItem = function(req, res) {
    pg.connect(connString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        };
        //This is tutorial code
        //var item = req.body;
        //I had this
        var month = req.body.month;
        var day = req.body.day;
        var temperatur = req.body.temperatur;
        console.log('Adding item: ' + item);
        //Create something like "pg insert ?"
        client
            .query('INSERT INTO days VALUES($1, $2, $3) returning id', [month, day, temperatur], function(err, result){
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var wines = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });

};