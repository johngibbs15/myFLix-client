import { useEffect, useState } from 'react';
import { Button, Card, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export const FavoriteMovies = ({ movies, user, deleteMovie, token }) => {
    const [User, setUser] = useState([]);
    console.log(user.FavoriteMovies);
    console.log(User.FavoriteMovies);

    const getUser = () => {
        fetch(
            `https://enigmatic-hamlet-36885.herokuapp.com/users/${user.Username}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setUser(response);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    let favoriteMovieList = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
    );
    console.log(favoriteMovieList);

    return (
        <>
            <div>
                <h1 className="title">Favorite Movies List</h1>
            </div>
            <div className="list-container">
                {favoriteMovieList.length === 0 ? (
                    <p>You have not added movies to your list yet</p>
                ) : (
                    favoriteMovieList.map((movie) => {
                        return (
                            <div className="movie-container hover-zoom">
                                <div>
                                    <Link to={`/movies/${movie._id}`}>
                                        <img
                                            variant="top"
                                            src={movie.ImagePath}
                                            crossOrigin="anonymous"
                                            style={{
                                                height: '100px',
                                                margin: '20px',
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div style={{ margin: '20px' }}>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <p>{movie.Description}</p>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button
                                            className="mb-4 bg-transparent button-styling border border-white"
                                            style={{ width: '25%' }}
                                        >
                                            Open
                                        </Button>
                                    </Link>
                                    <Button
                                        className="mb-4 bg-transparent button-styling border border-white"
                                        style={{ width: '25%' }}
                                        onClick={() => {
                                            deleteMovie(movie._id);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};
