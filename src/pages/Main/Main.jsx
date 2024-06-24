import styles from './Main.modules.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Main = ({ tests }) => {
	return (
		<div className="main">
			<h1>История прохождений</h1>
			<ul>
				{tests.map((test) => (
					<li key={test._id}>
						<p>Дата: {new Date(test.date).toLocaleDateString('ru-RU')}</p>
						<p>Общее количество вопросов: {test.totalQuestions}</p>
						<p>Количество верных ответов: {test.correctAnswers}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
