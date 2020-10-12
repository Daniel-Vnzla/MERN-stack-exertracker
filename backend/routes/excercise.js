const express = require('express');
const { addAsync } = require('@awaitjs/express');
const router = addAsync(express.Router());
const Exercise = require('../models/exercise.model.js');

router.getAsync('/',async (req, res) => {
	const exercise = await Exercise.find();
	res.status(200).json(exercise);
});

router.getAsync('/:id',async (req, res) => {
	const exercise = await Exercise.findById(req.params.id);
	res.status(200).json(exercise);

});

router.postAsync('/add',async (req, res) => {
	const { username, description, duration, date } = req.body;
	const newExercise = new Exercise({ username, description, duration, date });

	const exerciseSave = await newExercise.save();
	res.status(201).json({message: "Exercise Added!"});
});

router.postAsync('/update/:id',async (req,res) => {
	const { username, description, duration, date } = req.body;

	const exerciseUpdate = await Exercise.updateOne(
		{_id: req.params.id},
		{$set: { username, description, duration, date }});
	res.status(200).json({message: "Exercise Update!"});

   
})

router.deleteAsync('/delete/:id', async (req,res) => {
	const exerciseRemove = await Exercise.deleteOne({_id: req.params.id});
	res.status(200).json({message: "Exercise Delete!"});
});



module.exports = router;