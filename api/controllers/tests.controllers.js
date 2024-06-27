const Test = require('../models/tests.model');

async function getTests() {
	const tests = await Test.find();

	return Array.isArray(tests) ? tests : [];
}

async function updateTest(id, updatedTest) {
	try {
		return await Test.findByIdAndUpdate(id, updatedTest, {
			new: true,
		});
	} catch (error) {
		throw new Error('Произошла ошибка обновления теста: ' + error.message);
	}
}

module.exports = {
	getTests,
	updateTest,
};
