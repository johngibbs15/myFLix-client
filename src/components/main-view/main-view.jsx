import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FavoriteMovies } from '../profile-view/favorite-movies';
import { Container } from 'react-bootstrap';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const storedToken = localStorage.getItem('token');
    // const token = useState(storedToken ? storedToken : null);

    // Pass bearer token into each URL header

    const getMovies = () => {
        fetch('https://enigmatic-hamlet-36885.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    };

    const getUser = () => {
        fetch(
            `https://enigmatic-hamlet-36885.herokuapp.com/users/${username}`,
            {
                headers: { Authorization: `Bearer ${storedToken}` },
            }
        )
            .then((response) => response.json())
            .then((user) => {
                setUser(user);
                console.log(user);
            });
    };

    const addMovie = (movieId) => {
        axios
            .post(
                `https://enigmatic-hamlet-36885.herokuapp.com/users/${username}/movies/${movieId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteMovie = (movieId) => {
        axios
            .delete(
                `https://enigmatic-hamlet-36885.herokuapp.com/users/${username}/movies/${movieId}`,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getMovies();
        getUser();
    }, [username]);

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
                                            onLoggedIn={(user) =>
                                                setUsername(user)
                                            }
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
                                            username={username}
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
                                            username={username}
                                            user={user}
                                            movies={movies}
                                            deleteMovie={deleteMovie}
                                            getUser={getUser}
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
