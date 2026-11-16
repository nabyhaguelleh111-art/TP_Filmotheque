
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import FilmCard from "../components/FilmCard";
import { toEmbedUrl } from "../utils/trailer";

const emptyMovie = {
  title: "",
  year: "",
  genre: "",
  image: "",
  rating: "",
  description: "",
  trailer: "",
};

function Home({ movies, onAddMovie }) {
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [newMovie, setNewMovie] = useState(emptyMovie);

  const filteredMovies = movies.filter((movie) => {
    const matchesName = movie.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesRating =
      minRating === "" ||
      movie.rating >= Number(minRating);

    return matchesName && matchesRating;
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  }

  function handleAddMovie(event) {
    event.preventDefault();

    onAddMovie({
      title: newMovie.title.trim(),
      year: newMovie.year ? Number(newMovie.year) : null,
      genre: newMovie.genre.trim() || null,
      image: newMovie.image.trim(),
      rating: Number(newMovie.rating),
      description: newMovie.description.trim(),
      trailer: toEmbedUrl(newMovie.trailer),
    });

    setNewMovie(emptyMovie);
  }

  function resetFilters() {
    setSearch("");
    setMinRating("");
  }

  return (
    <Container className="py-4">

      <h2 className="mb-3">Ajouter un film</h2>

      <Form onSubmit={handleAddMovie}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nom du film</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Exemple : Avatar"
                value={newMovie.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                name="year"
                min="1888"
                max="2100"
                placeholder="Exemple : 2009"
                value={newMovie.year}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                placeholder="Exemple : Aventure"
                value={newMovie.genre}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Rating sur 10</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                placeholder="Exemple : 8.5"
                value={newMovie.rating}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Group>
              <Form.Label>Affiche (URL de l'image)</Form.Label>
              <Form.Control
                type="url"
                name="image"
                placeholder="https://exemple.com/affiche.jpg"
                value={newMovie.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Résumé du film…"
                value={newMovie.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label>Bande-annonce (lien YouTube)</Form.Label>
              <Form.Control
                type="url"
                name="trailer"
                placeholder="https://www.youtube.com/watch?v=…"
                value={newMovie.trailer}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <button type="submit" className="btn btn-primary mt-3 mb-4">
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

export default Home;
