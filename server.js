import express from "express";
import { readFileSync } from "fs"

const app = express();
const PORT = process.env.PORT || 3000;

let data = JSON.parse(readFileSync("./lines.json"));

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
	console.log(data)
	res.json(data);
});

app.get("/random", (req, res) => {
	let line = data[Math.floor(Math.random() * data.length)];

	let responseLine = [line];
	res.json(responseLine);
});

// Default response for any other request
app.use((req, res) => {
	res.status(404);
});
