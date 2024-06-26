import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../shared/components';
import { Collapsible } from './components';
import styles from './TestEdit.module.css';

export const TestEdit = ({ tests }) => {
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

	return (
		<div className={styles.container}>
			<h3>Редактирование</h3>
			<h3>{title}</h3>
			<form onSubmit={() => {}} className={styles.form}>
				{questions.map((question, index) => (
					<Collapsible title={`Вопрос №${index + 1}`}></Collapsible>
				))}
				<div className={styles.buttons}>
					<Button
						height="40px"
						width="250px"
						margin="0"
						hoverColor="#FFD700"
						onClick={handleBack}
					>
						Назад
					</Button>
					<Button
						type="submit"
						height="40px"
						width="250px"
						hoverColor="#98FB98"
					>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};

{
	/*{test.questions.map((question, index) => (*/
}
{
	/*	<div key={index}>*/
}
{
	/*		<label>Вопрос №{index + 1}:</label>*/
}
{
	/*		<input*/
}
{
	/*			type="text"*/
}
{
	/*			name="question"*/
}
{
	/*			value={question.question}*/
}
{
	/*			onChange={() => {}}*/
}
{
	/*		/>*/
}
{
	/*		<label>Варианты ответов:</label>*/
}
{
	/*		{question.options.map((option, optIndex) => (*/
}
{
	/*			<input*/
}
{
	/*				key={optIndex}*/
}
{
	/*				type="text"*/
}
{
	/*				name={`option${optIndex}`}*/
}
{
	/*				value={option}*/
}
{
	/*				onChange={() => {}}*/
}
{
	/*			/>*/
}
{
	/*		))}*/
}
{
	/*		<label>Правильный ответ:</label>*/
}
{
	/*		<input*/
}
{
	/*			type="text"*/
}
{
	/*			name="correctAnswer"*/
}
{
	/*			value={question.correctAnswer}*/
}
{
	/*			onChange={() => {}}*/
}
{
	/*		/>*/
}
{
	/*	</div>*/
}
{
	/*))}*/
}
