const express = require("express");
const db = require("./lines.json");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
	res.send(`<main>
				<h3>Routes</h3>
				<ul>
					<li>/all (GET)</li>
					<li>/random (GET)</li>
				</ul>
			  </main>`);
});

app.get("/all", (req, res) => {
	res.json(db);
});

app.get("/random", (req, res) => {
	let line = db[Math.floor(Math.random() * db.length)];
	let responseLine = [line];
	res.json(responseLine);
});

// Default response for any other request
app.use((req, res) => {
	res.status(404);
});
