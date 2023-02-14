import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { Button, Card } from 'react-bootstrap';

import './movie-view.scss';

const MovieView = ({ addMovie, movies, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    const text = movie.Description;
    const [showMore, setShowMore] = useState(false);

    return (
        <Card
            style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(255, 255, 255, 0.13)',
                height: 'auto',
            }}
            className="sizing card-styling mt-5"
        >
            <Card.Img
                crossOrigin="anonymous"
                variant="top"
                src={movie.ImagePath}
                style={{ width: '20%', height: 'auto' }}
            />
            <Card.Body>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    <Card.Title
                        className="mb-3"
                        style={{ color: '#fff', fontSize: '2rem' }}
                    >
                        {movie.Title}
                    </Card.Title>
                    <Card.Text className="mb-2">
                        <p>
                            {showMore ? text : `${text.substring(0, 50)}`}
                            <a
                                className="btn"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? 'Show less' : 'Show more'}
                            </a>
                        </p>
                    </Card.Text>
                    <div
                        style={{
                            display: 'flex',
                        }}
                        className="mt-2"
                    >
                        <div className="mr-2">
                            <Button
                                className="mb-2 bg-transparent align-self-end button-styling border border-white text-white"
                                onClick={() => {
                                    addMovie(movie._id);
                                }}
                            >
                                Add Favorite
                            </Button>
                        </div>
                        <div>
                            <Link to={`/`}>
                                <Button className=" bg-transparent align-self-end button-styling border border-white text-white">
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MovieView;
