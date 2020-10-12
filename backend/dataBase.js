const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open',() => {
	console.log('MongoDB database connection stablished succesfully');
});

