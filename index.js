const { request, response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors()) 
app.use(express.static('build'))

// middleware functions
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const generateId = () => {
  const maxId =
    persons.length > 0
      ? // [...spread] array into numbers as Math.max accepts numbers only || MDN Math.max(...array1)
        Math.max(...persons.map((p) => p.id))
      : 0;
  return maxId + 1;
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});

// parser use required
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  const filtered = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing, please try again.",
    });
  } else if (filtered) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/", (request, response) => {
  response.send(`
    <p>Phone book has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
