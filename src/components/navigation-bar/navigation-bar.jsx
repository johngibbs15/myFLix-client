import {
    Navbar,
    Container,
    Nav,
    Button,
    Dropdown,
    Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="dark" expand="lg" className="">
            <Container>
                <Navbar.Brand as={Link} className="text-white" to="/">
                    myFlix
                </Navbar.Brand>
                <Navbar.Toggle
                    className="bg-white"
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav>
                        {!user && (
                            <>
                                <Nav>
                                    <Nav.Link
                                        className="mr-2"
                                        style={{ color: '#fff' }}
                                        as={Link}
                                        to="/login"
                                    >
                                        Sign in
                                    </Nav.Link>
                                    <Button
                                        className="second-button"
                                        style={{
                                            backgroundColor: 'purple',
                                            color: '#fff',
                                            border: 'none',
                                            width: '115px',
                                        }}
                                        size="sm"
                                    >
                                        <Nav.Link
                                            style={{ color: '#fff' }}
                                            as={Link}
                                            to="/register"
                                        >
                                            Sign up now
                                        </Nav.Link>
                                    </Button>
                                </Nav>
                            </>
                        )}
                        {user && (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        style={{
                                            color: '#fff',
                                            backgroundColor: 'purple',
                                            border: 'none',
                                        }}
                                    >
                                        {user.Username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/users/:userID"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Edit Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/users/:userID/favorite-movies"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Favorite Movies
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={onLoggedOut}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
