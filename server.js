const express = require("express");
const db = require("./database.js");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
	let sql = "select * from lines";
	let params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows);
		res.json({
			message: "success",
			data: rows,
		});
	});
});

app.get("/all", (req, res) => {
	let sql = "select * from lines";
	let params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows);
		res.json({
			message: "success",
			data: rows,
		});
	});
});

app.get("/random", (req, res) => {
	let sql = `SELECT * FROM lines ORDER BY RANDOM() LIMIT 1`;
	let params = [];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows);
		res.json({
			message: "success",
			data: rows,
		});
	});
});

app.post("/submit", (req, res) => {
	let errors = [];

	console.log(req.body);

	if (!req.body.password) {
		errors.push("Please enter a password");
	}

	if (req.body.password !== "vanaj") {
		errors.push("Please enter the correct password");
	}

	if (!req.body.line) {
		errors.push("Please submit a pickup line");
	}

	if (errors.length) {
		res.status(400).json({ error: errors });
		return;
	}

	let data = {
		line: req.body.line,
	};

	let sql = "INSERT INTO lines (line) VALUES (?)";
	let param = [data.line];

	db.run(sql, param, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: data,
			id: this.lastID,
		});
	});
});

// Default response for any other request
app.use((req, res) => {
	res.status(404);
});
