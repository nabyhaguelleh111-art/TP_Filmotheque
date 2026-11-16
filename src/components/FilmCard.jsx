
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function FilmCard({ movie }) {
    return (
        <Link
            to={`/films/${movie.id}`}
            className="film-card-link"
            aria-label={`Voir la fiche de ${movie.title}`}
        >
            <Card className="h-100 shadow-sm">
                {movie.image ? (
                    <Card.Img
                        variant="top"
                        src={movie.image}
                        alt={`Affiche de ${movie.title}`}
                    />
                ) : (
                    <div className="card-img-placeholder" aria-hidden="true">
                        🎬
                    </div>
                )}

                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>

                    <Card.Text>
                        Année : {movie.year ?? "Non renseignée"}
                    </Card.Text>

                    <Card.Text>
                        Genre : {movie.genre ?? "Non renseigné"}
                    </Card.Text>

                    <Badge bg="warning" text="dark">
                        Note : {movie.rating}/10
                    </Badge>

                    <p className="film-card-hint mb-0 mt-3">
                        Voir la fiche et la bande-annonce →
                    </p>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default FilmCard;
