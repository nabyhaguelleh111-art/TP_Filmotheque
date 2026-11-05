
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import movies from "./data/movies";
import FilmCard from "./Components/FilmCard";

function App() {
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState("");

  const [movieList, setMovieList] = useState(() => {
  const savedMovies = localStorage.getItem("filmotheque");

  return savedMovies ? JSON.parse(savedMovies) : movies;
});

useEffect(() => {
  localStorage.setItem("filmotheque", JSON.stringify(movieList));
}, [movieList]);

  const filteredMovies = movieList.filter((movie) => {
    const matchesName = movie.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesRating =
      minRating === "" ||
      movie.rating >= Number(minRating);

    return matchesName && matchesRating;
  });

  const [newMovie, setNewMovie] = useState({
    title: "",
    rating: "",
  });

  function handleAddMovie(event) {
    event.preventDefault();

    const movieToAdd = {
      id: Date.now(),
      title: newMovie.title,
      rating: Number(newMovie.rating),
    };

    setMovieList([...movieList, movieToAdd]);

    setNewMovie({
      title: "",
      rating: "",
    });
  }

  function resetFilters() {
    setSearch("");
    setMinRating("");
  }
  

  return (
    <Container className="py-4">

      <h2 className="mb-3">Ajouter un film</h2>

      <Form onSubmit={handleAddMovie}>
        <Form.Group className="mb-3">
          <Form.Label>Nom du film</Form.Label>
          <Form.Control
            type="text"
            placeholder="Exemple : Avatar"
            value={newMovie.title}
            onChange={(event) =>
              setNewMovie({
                ...newMovie,
                title: event.target.value,
              })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating sur 10</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Exemple : 8.5"
            value={newMovie.rating}
            onChange={(event) =>
              setNewMovie({
                ...newMovie,
                rating: event.target.value,
              })
            }
            required
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary mb-4">
          Ajouter le film
        </button>
      </Form>

      <h1 className="text-center mb-4">
        Ma filmothèque
      </h1>

      <Row className="g-3 mb-4">
        <Col md={8}>
          <Form.Group>
            <Form.Label>Rechercher par nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Inception"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Note minimale</Form.Label>
            <Form.Select
              value={minRating}
              onChange={(event) =>
                setMinRating(event.target.value)
              }
            >
              <option value="">Toutes les notes</option>
              <option value="7">7/10 et plus</option>
              <option value="8">8/10 et plus</option>
              <option value="9">9/10 et plus</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {filteredMovies.length} film(s) trouvé(s)
        </p>

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={resetFilters}
        >
          Réinitialiser
        </button>
      </div>

      {filteredMovies.length > 0 ? (
        <Row className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} lg={4}>
              <FilmCard movie={movie} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h3>Aucun film trouvé</h3>
          <p className="text-muted">
            Modifiez vos critères de recherche.
          </p>
        </div>
      )}
    </Container>
  );
}

export default App;
