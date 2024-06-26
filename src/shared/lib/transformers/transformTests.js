export const transformTests = (tests) => {
	return tests.map(({ _id, title, date, questions }) => ({
		id: _id,
		title,
		questions: questions.map(({ _id, question, options, correct_answer }) => ({
			id: _id,
			question,
			options,
			correctAnswer: correct_answer,
		})),
	}));
};
