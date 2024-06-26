import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/components';
import styles from './TestItem.module.css';

export const TestItem = ({ id, title }) => {
	const navigate = useNavigate();

	const onStartClick = ({ target }) => {
		navigate(`/tests/${id}`);
	};

	const onEditClick = ({ target }) => {
		console.log('onEditClick');
	};

	return (
		<div className={styles.container}>
			<span className={styles.title}>{title}</span>
			<div className={styles.buttons}>
				<Button id={id} onClick={onStartClick}>
					Запустить
				</Button>
				<Button id={id} onClick={onEditClick}>
					Редактировать
				</Button>
			</div>
		</div>
	);
};
