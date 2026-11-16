
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import { isEmbeddable } from "../utils/trailer";

function MovieDetail({ movies }) {
  const { id } = useParams();

  const movie = movies.find((item) => String(item.id) === id);

  if (!movie) {
    return (
      <Container className="py-5 text-center">
        <h1>Film introuvable</h1>
        <p className="text-muted">
          Ce film n'existe pas ou a été supprimé.
        </p>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour à l'accueil
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 movie-detail">
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-4">
        ← Retour à l'accueil
      </Link>

      <Row className="g-4 align-items-start">
        <Col md={4}>
          {movie.image ? (
            <img
              src={movie.image}
              alt={`Affiche de ${movie.title}`}
              className="movie-detail-poster"
            />
          ) : (
            <div className="card-img-placeholder movie-detail-placeholder">
              🎬
            </div>
          )}
        </Col>

        <Col md={8}>
          <h1 className="movie-detail-title">{movie.title}</h1>

          <p className="text-muted mb-3">
            {movie.year ?? "Année non renseignée"}
            {movie.genre ? ` · ${movie.genre}` : ""}
          </p>

          <Badge bg="warning" text="dark">
            Note : {movie.rating}/10
          </Badge>

          <h2 className="h4 mt-4">Description</h2>
          <p className="movie-detail-description">
            {movie.description ||
              "Aucune description disponible pour ce film."}
          </p>
        </Col>
      </Row>

      <section className="mt-4">
        <h2 className="h4 mb-3">Bande-annonce</h2>

        {movie.trailer ? (
          isEmbeddable(movie.trailer) ? (
            <div className="ratio ratio-16x9 trailer-frame">
              <iframe
                src={movie.trailer}
                title={`Bande-annonce de ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={movie.trailer}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              Voir la bande-annonce
            </a>
          )
        ) : (
          <p className="text-muted">
            Aucune bande-annonce disponible pour ce film.
          </p>
        )}
      </section>
    </Container>
  );
}

export default MovieDetail;
