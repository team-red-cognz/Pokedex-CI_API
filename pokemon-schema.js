var mongoose = require("mongoose");

exports.pokemonschema = mongoose.Schema(
    {
        name: {
            type: String
        },
        id: {
            type: String
        },
        abilities: [{
            type: String
        }]
    }
);

exports.pokemonModel = mongoose.model('pokemon', this.pokemonschema);