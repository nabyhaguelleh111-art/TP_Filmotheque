
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import movies from "./data/movies";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

const STORAGE_KEY = "filmotheque";

// Charge les films sauvegardés et complète les anciennes données
// (description, bande-annonce, affiche…) avec celles du catalogue.
function loadMovies() {
  const savedMovies = localStorage.getItem(STORAGE_KEY);

  if (!savedMovies) return movies;

  try {
    const parsedMovies = JSON.parse(savedMovies);

    if (!Array.isArray(parsedMovies)) return movies;

    return parsedMovies.map((movie) => {
      const catalogueMovie = movies.find(
        (item) => item.id === movie.id || item.title === movie.title
      );

      if (!catalogueMovie) return movie;

      const mergedMovie = { ...catalogueMovie, ...movie };

      // Une information vide dans le localStorage ne doit pas
      // effacer celle du catalogue (ex. un film ajouté sans bande-annonce).
      Object.keys(catalogueMovie).forEach((key) => {
        const savedValue = movie[key];

        if (
          savedValue === "" ||
          savedValue === null ||
          savedValue === undefined
        ) {
          mergedMovie[key] = catalogueMovie[key];
        }
      });

      return mergedMovie;
    });
  } catch {
    return movies;
  }
}

function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1>Page introuvable</h1>
      <p className="text-muted">
        La page que vous cherchez n'existe pas.
      </p>
      <Link to="/" className="btn btn-outline-secondary">
        ← Retour à l'accueil
      </Link>
    </Container>
  );
}

function App() {
  const [movieList, setMovieList] = useState(loadMovies);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movieList));
  }, [movieList]);

  function addMovie(movie) {
    setMovieList((currentMovies) => [
      ...currentMovies,
      { ...movie, id: Date.now() },
    ]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home movies={movieList} onAddMovie={addMovie} />}
        />
        <Route
          path="/films/:id"
          element={<MovieDetail movies={movieList} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
