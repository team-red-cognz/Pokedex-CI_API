var mongoose = require('mongoose');
var express = require('express')
var cors = require('cors');
var config = require('./config');
var app = express();
// var pokeRoutes = require("./pokemon-routes");

var express = require('express');
var router = express.Router();
var pokeschema = require('./pokemon-schema.js');
var config = require('./config.js');
var unirest = require('unirest');

var poke_name = 'ditto'

router.get('/getPokemon', function (err, res, body) {
    
            var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name + '/'); 

            req.end(function (res) {
                if (res.error) throw new Error(res.error);

                // console.log(res.body);

                var r = res.body
                return r.name, r.id, r.abilities.forEach(element => {
                    console.log(element.ability.name)
                });
            });
});



app.use(cors({ origin: true }));

app.use(express.json());

// app.use("/pokemon", pokeRoutes);

// app.use(app.router);
// routes.initialize(app);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

mongoose.connect(
    config.app.MONGODB_URI,
    { useNewUrlParser: true })
    .then((res) => {
        console.log('Connection to MongoDB established.');
    }, (error) => {
        console.error('Failed to connect to MongoDB. Exitting.');
        console.error(error);
        process.exit(1);
    }).then(() => {
        // If the connection is successful, set up Express to listen for incoming requests.
        app.listen(config.app.PORT, () => {
            console.log(`Server running on port ${config.app.PORT}`);
        });
    });



