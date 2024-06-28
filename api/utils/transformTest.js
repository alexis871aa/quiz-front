function transformTest({ id, title, questions }) {
	return {
		id,
		title,
		questions: questions.map(({ id, question, options, correctAnswer }) => ({
			id,
			question,
			options,
			correct_answer: correctAnswer,
		})),
	};
}

module.exports = {
	transformTest,
};
