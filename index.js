var mongoose = require('mongoose');
var express = require('express')
var cors = require('cors');
var config = require('./config');
var app = express();

var pokeschema = require('./pokemon-schema.js');
var config = require('./config.js');
var unirest = require('unirest');

app.use(cors({ origin: true }));
app.use(express.json());

//get request from our API
app.get('/getOurPokemon/:name', async (req, resp) => {
    const pokemon = await pokeschema.pokemonModel.find({ name: req.params.name });
    resp.status(200).send(pokemon);
});

app.get('/getOurPokemon', (req, resp) => {
    const pokemon = pokeschema.pokemonModel.find({ name: req.params.name }).then(
        (pokemon) => {
            resp.status(200).send(pokemon);
        }
    )
    // resp.status(200).send(pokemon);
});

//get request from pokeapi
app.get('/getPokemon', function (req, resp) {
    var poke_name = req.query.name;
    var eq = [];

    const pokemon = pokeschema.pokemonModel.find({ name: poke_name }).then(
        (pokemon) => {
            console.log(typeof(pokemon))
            // resp.send(pokemon);

            if (isEmpty(pokemon)) {
                console.log('if')
                var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name);

                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    var r = res.body
                    abilityNames = [];
                    r.abilities.forEach(element => {abilityNames.push(element.ability.name);});
                    eq = abilityNames
                    var obj = {name: r.name,id: r.id,abilities: eq}


                    const pkm = new pokeschema.pokemonModel(obj);
                    pkm.save();
                    resp.send(JSON.stringify(obj))
                })

            }
            else{
                console.log('else')
                // console.log(typeof(pokemon))
                resp.send(JSON.stringify(pokemon[0]))
            }
        }
    )

    // var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name);

    // req.end(function (res) {
    //     if (res.error) throw new Error(res.error);
    //     var r = res.body
    //     abilityNames = [];

    //     r.abilities.forEach(element => {
    //         abilityNames.push(element.ability.name);
    //     });
    //     eq = abilityNames
    //     var obj = {
    //         name: r.name,
    //         id: r.id,
    //         abilities: eq
    //     }

    //     resp.send(JSON.stringify(obj))
    // })


});

app.post('/addPokemon', (req, res, next) => {
    const pokemon = new pokeschema.pokemonModel(req.body);
    return pokemon.save().then(
        doc => res.status(201).send(doc),
        error => next(error)
    );
});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


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