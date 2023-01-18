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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('https://enigmatic-hamlet-36885.herokuapp.com/movies', {})
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, []);

    useEffect(() => {
        fetch('https://enigmatic-hamlet-36885.herokuapp.com/users/', {})
            .then((response) => response.json())
            .then((user) => {
                setUser(user);
                console.log(user);
            });
    }, []);

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
                                    <Col md={5}>
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
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user) => setUser(user)}
                                            username={(username) =>
                                                setUsername(username)
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
                                            key={movies.id}
                                            movies={movies}
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
                                                className="mb-5"
                                                key={movie.id}
                                                sm={5}
                                                md={3}
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
                                {JSON.stringify(username)}
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : user.length === 0 ? (
                                    <Col>No such user found!</Col>
                                ) : // <Col>
                                //     <ProfileView
                                //         username={username}
                                //         user={user}
                                //     />
                                // </Col>
                                null}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
