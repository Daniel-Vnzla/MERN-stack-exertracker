const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Settings
require('dotenv/config');

const { mongoose } = require('./dataBase.js');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/exercises', require('./routes/excercise.js'));
app.use('/users', require('./routes/user.js'));


// Server
app.listen(port,() => {
	console.log(`Server is running on port: ${port}`);
})