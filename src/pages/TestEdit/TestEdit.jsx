import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, QuestionList } from '../../shared/components';
import styles from './TestEdit.module.css';

export const TestEdit = ({ tests, onSaveTest }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [test, setTest] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const foundTest = tests.find((test) => test.id === id);

		if (!foundTest) {
			navigate('/test/not-found');
		} else {
			setTest(foundTest);
			setLoading(false);
		}
	}, [id, tests, navigate]);

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Error: {error}</div>;

	const { title, questions } = test;

	const handleBack = () => {
		navigate('/');
	};

	const handleUpdateQuestion = (updateQuestion) => {
		setTest((prevTest) => ({
			...prevTest,
			questions: prevTest.questions.map((q) =>
				q.id === updateQuestion.id ? updateQuestion : q,
			),
		}));
	};

	const handleSaveTest = async (event) => {
		event.preventDefault();

		try {
			const transformedTest = ({ id, title, questions }) => ({
				_id: id,
				title,
				questions: questions.map(({ id, question, options, correctAnswers }) => ({
					_id: id,
					question,
					options,
					correct_answer: correctAnswers,
				})),
			});

			console.log('TEST EDIT - transformedTest, до запроса', transformedTest(test));
			const response = await axios.put(`/api/tests/${id}`, transformedTest(test));
			console.log('TEST EDIT - response после запроса', response.data);

			onSaveTest(response.data);
			navigate('/');
		} catch (error) {
			console.log(error);
			setError('Ошибка сохранения теста!');
		}
	};

	return (
		<div className={styles.containerHeader}>
			<h3>Редактирование</h3>
			<h3>{title}</h3>
			<form className={styles.form} onSubmit={handleSaveTest}>
				<QuestionList
					questions={questions}
					onUpdateQuestion={handleUpdateQuestion}
				/>
				<div className={styles.buttons}>
					<Button
						height="40px"
						width="320px"
						margin="0"
						hoverColor="#FFD700"
						onClick={handleBack}
					>
						Назад
					</Button>
					<Button
						type="submit"
						height="40px"
						width="320px"
						hoverColor="#98FB98"
					>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};
