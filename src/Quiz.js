import { Main } from './pages';
import { Route, Routes } from 'react-router-dom';
import styles from './Quiz.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Quiz = () => {
	const [tests, setTests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const response = await axios.get('/api/tests');
				setTests(response.data);
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
					element={isLoading ? <div>Loading...</div> : <Main tests={tests} />}
				/>
				<Route
					path="*"
					element={<div>Ошибка, такой страницы не существует</div>}
				/>
			</Routes>
		</div>
	);
};
