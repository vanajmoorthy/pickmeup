import express from "express";
import lines from "./lines.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
	res.send(`<main style="margin: 30px;">
				<h3>Routes</h3>
				<ul>
					<li>/all (GET)</li>
					<li>/random (GET)</li>
				</ul>
			  </main>`);
});

app.get("/all", (req, res) => {
	res.json(lines);
});

app.get("/random", (req, res) => {
	let line = lines[Math.floor(Math.random() * lines.length)];
	let responseLine = [line];
	res.json(responseLine);
});

// Default response for any other request
app.use((req, res) => {
	res.status(404);
});
