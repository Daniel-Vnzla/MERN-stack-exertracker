const express = require('express');
const { addAsync } = require('@awaitjs/express');
const router = addAsync(express.Router());
const User = require('../models/user.model.js');

router.getAsync('/', async (req, res) => {
	const user = await User.find();
	res.json(user);
});

router.postAsync('/add', async (req, res) => {
	const username = req.body.username;

	const newUser = new User({username});
	await newUser.save();
	res.json({ message: "User added!" });
});

module.exports = router;