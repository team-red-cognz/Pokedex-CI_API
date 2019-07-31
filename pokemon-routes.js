// var express = require('express');
// var router = express.Router();
// var pokeschema = require('./pokemon-schema.js');
// var config = require('./config.js');
// var unirest = require('unirest');

// var poke_name = 'ditto'

// router.get('/getPokemon', function (err, res, body) {
    
//             var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name + '/'); 

//             req.end(function (res) {
//                 if (res.error) throw new Error(res.error);

//                 // console.log(res.body);

//                 var r = res.body
//                 return r.name, r.id, r.abilities.forEach(element => {
//                     console.log(element.ability.name)
//                 });
//             });
// });




// router.get('/getPokemon', function (err, res, body) {
//     if (!err) {
//         //TODO: handle err
//         const pokedetails = pokeschema.pokemonModel.find(poke_name);
//         res.status(200).send(pokedetails);
//     }
//     else if (res.statusCode !== 200) {//etc
//         //TODO Do something with response

//             var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + poke_name + '/'); 

//             req.end(function (res) {
//                 if (res.error) throw new Error(res.error);

//                 // console.log(res.body);

//                 var r = res.body
//                 return r.name, r.id, r.abilities.forEach(element => {
//                     console.log(element.ability.name)
//                 });
//             });
        

//     }else {
        
//     }
// });


// router.post(

// );

// router.delete(

// );

// var x = () => {

//     var req = unirest.get('https://pokeapi.co/api/v2/pokemon/' + pokemon_name + '/');

//     req.end(function (res) {
//         if (res.error) throw new Error(res.error);

//         // console.log(res.body);

//         var r = res.body
//         console.log(r.name)
//         console.log(r.id)
//         // console.log(r.abilities[0].ability.name)
//         r.abilities.forEach(element => {
//             console.log(element.ability.name)
//         });
//     });
// }


// x()