import React from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import axios from 'axios';
import { FavoriteMovies } from '../profile-view/favorite-movies';
import { Container } from 'react-bootstrap';

const BASE_URL = 'http://ec2-35-170-200-195.compute-1.amazonaws.com:8080/';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // Pass bearer token into each URL header
    const getMovies = () => {
        fetch(`${BASE_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    };

    const addMovie = (movieId) => {
        if (!token) return;

        fetch(`${BASE_URL}/users/${user.Username}/movies/${movieId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                alert('Movie has been added to favorites');
                return response.json(), console.log(response);
            })
            .catch((error) => {
                alert('Something went wrong' + error);
            });
    };

    const deleteMovie = (movieId) => {
        if (!token) return;

        fetch(`${BASE_URL}/users/${user.Username}/movies/${movieId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                alert('Movie has been deleted');
                return response.json(), console.log(response);
            })
            .catch((error) => {
                alert('Something went wrong' + error);
            });
    };

    useEffect(() => {
        getMovies();
    }, [user]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/register"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8} lg={5}>
                                        <RegistrationView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8} lg={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            key={movies._id}
                                            movies={movies}
                                            addMovie={addMovie}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col
                                                className="mt-3"
                                                key={movie._id}
                                            >
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:userID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : user.length === 0 ? (
                                    <Col>No such user found!</Col>
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            deleteMovie={deleteMovie}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:userID/favorite-movies"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : user.length === 0 ? (
                                    <Col>No such user found!</Col>
                                ) : (
                                    <Col>
                                        <FavoriteMovies
                                            token={token}
                                            user={user}
                                            movies={movies}
                                            deleteMovie={deleteMovie}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
