import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import {
    Stack,
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';

import './movie-view.scss';

const MovieView = ({ movies, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    return (
        <Container className="content">
            <Row>
                <Col>
                    <div>
                        <img src={movie.ImagePath} className="movie-poster" />
                    </div>
                </Col>
                <Col>
                    <Card className="p-3 movie-info">
                        <div className="movie-title">
                            <h4>Title</h4>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-description mt-4">
                            <h4 className="label">Description </h4>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <Link to={`/`}>
                            <button className="back-button mt-4">Back</button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieView;
