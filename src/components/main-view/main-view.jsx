import axios from 'axios';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
        };
    }

    componentDidMount() {
        axios
            .get('https://enigmatic-hamlet-36885.herokuapp.com/movies')
            .then((response) => {
                this.setState({
                    movies: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    onLoggedIn(user) {
        this.setState({
            user,
        });
    }
    render() {
        const { movies, selectedMovie, user, registration } = this.state;

        // if (!registration)
        //     return (
        //         <RegistrationView
        //             onRegistration={(registration) =>
        //                 this.onRegistration(registration)
        //             }
        //         />
        //     );

        // if (!user)
        //     return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        // If movies list equals 0 "The list is empty" will render in the DOM
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Route exact path="/" render={() => {
                    // if (!user) return (
                    // <Col>
                    // <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                    // </Col> )
                    if (!user) return (<Row>
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                    </Row>)


                    // Before the movies have been loaded
                    if (movies.length === 0) return <div className="main-view" />

                    return (movies.map(m => (
                        <Col md={3} key={m._id}>
                            <MovieCard movie={m} />
                        </Col>)
                    ))
                }} />
            </Router>
            // Displays details of each movie
            //Returns to Main View when back button is clicked
            // <Row className="main-view justify-content-md-center">
            //     {selectedMovie ? (
            //         <Col md={8} className="movie-view">
            //             <MovieView
            //                 movieDetails={selectedMovie}
            //                 onBackClick={(newSelectedMovie) => {
            //                     this.setSelectedMovie(newSelectedMovie);
            //                 }}
            //             />
            //         </Col>
            //     ) : (
            //         // Iterates over movie object and returns unique ID and movie data
            //         //Event listener that listens to click and is directed to Movie View
            //         movies.map((movie) => (
            //             <Col md={3}>
            //                 <MovieCard
            //                     key={movie._id}
            //                     movieData={movie}
            //                     onMovieClick={(movie) => {
            //                         this.setSelectedMovie(movie);
            //                     }}
            //                 />
            //             </Col>
            //         ))
            //     )}
            // </Row>
        );
    }
}

export default MainView;
