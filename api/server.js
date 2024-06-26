const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const { getTests } = require('./controllers/tests.controllers');

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.get('/api/tests', async (req, res) => {
	try {
		const tests = await getTests();
		res.status(200).json(tests);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching tests', error });
	}
});

mongoose
	.connect(
		'mongodb+srv://alexis871:Valentina2006$@cluster.7kdmzin.mongodb.net/tests?retryWrites=true&w=majority&appName=Cluster',
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log(chalk.green(`Server has been started on port ${PORT}...`));
		});
	});
