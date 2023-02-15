import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    return (
        <Card
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.13)',
                height: '350px',
                width: '190px',
                overflow: 'hidden',
            }}
            className="card-styling "
        >
            <Card.Img
                crossOrigin="anonymous"
                variant="top"
                src={movie.ImagePath}
                style={{ height: '250px' }}
            />
            <Card.Body>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Card.Title style={{ color: '#fff', fontSize: '1rem' }}>
                        {movie.Title}
                    </Card.Title>
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button
                            className="mb-4 bg-transparent align-self-end button-styling border border-white text-white"
                            style={{ width: '50%', fontSize: '0.75rem' }}
                            variant="bottom"
                        >
                            Open
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
};
