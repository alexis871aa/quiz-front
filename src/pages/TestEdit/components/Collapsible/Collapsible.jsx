import { useState } from 'react';
import styles from './Collapsible.module.css';

export const Collapsible = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<div className={styles.collapsible}>
			<div className={styles.header} onClick={toggleOpen}>
				<span>{title}</span>
				<span className={styles.arrow}>{isOpen ? '⋀' : '⋁'}</span>
			</div>
			{isOpen && <div className={styles.content}>{children}</div>}
		</div>
	);
};
