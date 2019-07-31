var mongoose = require('mongoose');
var express = require('express')
var cors = require('cors');
var config = require('./config');
var app = express();
var pokeRoutes = require("./pokemon-routes");

app.use(cors({origin: true}));

app.use(express.json());

app.use("/pokemon", pokeRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

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