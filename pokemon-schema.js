var mongoose = require("mongoose");


var abilityschema = mongoose.Schema(
    {
        abilityOne: {
            type: String
        },
        abilityTwo: {
            type: String
        }
    }
);

exports.pokemonschema = mongoose.Schema(
    {
        name: {
            type: String
        },
        id: {
            type: String
        },
        ability: [abilityschema]
        
    }
);

exports.pokemonModel = mongoose.model('pokemon', this.pokemonschema);