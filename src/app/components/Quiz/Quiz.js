import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Error, Main, Test, TestEdit } from '../../../pages';
import { transformTests } from '../../../shared/lib/transformers';
import styles from './Quiz.module.css';

export const Quiz = () => {
	const [tests, setTests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const { data } = await axios.get('/api/tests');
				setTests(transformTests(data));
			} catch (error) {
				console.error('Error fetching tests:', error);
			}
		};

		fetchTests().finally(() => setIsLoading(false));
	}, []);

	const handleSaveTest = async (updatedTest) => {
		console.log('QUIZ - updatedTest DO', updatedTest);
		try {
			const transformedTest = {
				...updatedTest,
				correct_answer: updatedTest.correctAnswer,
			};

			console.log('QUIZ - transformedTest POSLE', transformedTest);

			const response = await axios.put(`/api/tests/${updatedTest.id}`, updatedTest);

			setTests((prevTests) =>
				prevTests.map((test) =>
					test.id === updatedTest.id ? response.data : test,
				),
			);
		} catch (error) {
			console.error('Ошибка сохранения теста:', error);
		}
	};

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						isLoading ? (
							<div className={styles.loader}>Загрузка...</div>
						) : (
							<Main tests={tests} />
						)
					}
				/>
				<Route path="/tests/:id" element={<Test tests={tests} />} />
				<Route
					path="/tests/:id/edit"
					element={<TestEdit tests={tests} onSaveTest={handleSaveTest} />}
				/>
				<Route
					path="/test/not-found"
					element={<Error>Ошибка, такой страницы не существует!</Error>}
				/>
				<Route
					path="*"
					element={<Error>Ошибка, такой страницы не существует!</Error>}
				/>
			</Routes>
		</div>
	);
};
