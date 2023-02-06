const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;

const app = express();

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateMovie, validateUser } = require("./validator");

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);

app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);


const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);

app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/users/:id", validateUser, userHandlers.updateUser);

//app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
