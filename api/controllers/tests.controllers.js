const Test = require('../models/tests.model');

async function getTests() {
	const tests = await Test.find();

	return Array.isArray(tests) ? tests : [];
}

module.exports = {
	getTests,
};
