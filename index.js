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

app.use(cors({ origin: true }));

app.use(express.json());


//get request from our API
app.get( '/getOurPokemon/:name', async (req,resp) => {
    // console.log(req.query)
    const pokemon = await pokeschema.pokemonModel.find({name:req.params.name});
    //console.log(pokemon.name)
    //console.log(req.params.name)
    resp.status(200).send(pokemon);
});




//get request from pokeapi
app.get('/getPokemon', function (req, resp) {
            
            // console.log('hello')
            var poke_name = req.query.name;
            var eq = [];
    
            var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name); 

            req.end(function (res) {
                if (res.error) throw new Error(res.error);

                // console.log(res.body);

                var r = res.body
                // console.log(r.name)

                abilityNames = [];

                r.abilities.forEach(element => {
                   abilityNames.push(element.ability.name);
                });
                eq = abilityNames
                var obj = {
                    name: r.name,
                    id: r.id,
                    abilities: eq
                }
                
                resp.send(JSON.stringify(obj))
            })

           
});

app.post('/addPokemon', (req, res, next) => {
    // console.log(req.body)
    // console.log('hello post')
    const pokemon = new pokeschema.pokemonModel(req.body);
    return pokemon.save().then(
        doc => res.status(201).send(doc),
        error => next(error)
    );
});



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























