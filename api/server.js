const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const { getTests, updateTest } = require('./controllers/tests.controllers');

const app = express();
const PORT = 3000;

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

app.put('/api/tests/:id', async (req, res) => {
	const { id } = req.params;
	const updatedTest = req.body;

	try {
		const test = await updateTest(id, updatedTest);
		res.json(test);
	} catch (error) {
		res.status(500).json({ message: 'Error updating test', error });
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
