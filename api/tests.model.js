const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	totalQuestions: {
		type: Number,
		required: true,
	},
	correctAnswers: {
		type: Number,
		required: true,
	},
});

const TestsModel = mongoose.model('Test', TestSchema);

module.exports = TestsModel;
