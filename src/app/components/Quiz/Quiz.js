import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Error, Main, Test } from '../../../pages';
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
