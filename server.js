const express = require("express");
const db = require("./lines.json");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
	res.json(db);
});

app.get("/all", (req, res) => {
	res.json(db);
});

app.get("/random", (req, res) => {
	let line = db[Math.floor(Math.random() * db.length)];
	res.json(line);
});

// Default response for any other request
app.use((req, res) => {
	res.status(404);
});
