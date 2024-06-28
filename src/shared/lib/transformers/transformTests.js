export const transformTests = (tests) => {
	if (Array.isArray(tests)) {
		return tests.map(({ _id, title, questions }) => ({
			id: _id,
			title,
			questions: questions.map(({ _id, question, options, correct_answer }) => ({
				id: _id,
				question,
				options,
				correctAnswer: correct_answer,
			})),
		}));
	} else {
		return {
			id: tests._id,
			title: tests.title,
			questions: tests.questions.map(
				({ _id, question, options, correct_answer }) => ({
					id: _id,
					question,
					options,
					correctAnswer: correct_answer,
				}),
			),
		};
	}
};
