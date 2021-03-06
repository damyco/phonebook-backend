const { request, response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
//logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing, please try again.",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((addedPerson) => response.json(addedPerson))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const options = {
    runValidators: true,
    new: true,
  };
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findOneAndUpdate(
    request.params.id,
    person,
    options,
    (error, model) => {
      if (error) {
        return response.status(422).json(error);
      }

      return response.status(200).json(model);
    }
  ).catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint." });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "wrong id format" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
