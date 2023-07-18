import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login-view.scss';
import '../../index.css';

import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';

const BASE_URL = 'http://ec2-35-170-200-195.compute-1.amazonaws.com:8080';

export function LoginView({ onLoggedIn }) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            access: username,
            secret: password,
        };

        fetch(`${BASE_URL}/login?Username=${username}&Password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Login response: ', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert('No such user');
                }
            })
            .catch((e) => {
                alert('Something went wrong:' + '' + e);
            });
    };

    return (
        <Container className="content">
            <Row className=" m-auto">
                <Col>
                    <CardGroup>
                        <Card
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.13)',
                            }}
                            className="card-styling p-4"
                        >
                            <Card.Body>
                                <Card.Title className="text-center mb-4 text-white">
                                    Login
                                </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsername">
                                        <Form.Control
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-4 input"
                                        controlId="formPassword"
                                    >
                                        <Form.Control
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            placeholder="Password"
                                            type="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="mb-4 bg-transparent button-styling border border-white"
                                    >
                                        Submit
                                    </Button>
                                </Form>

                                <p className=" text-center text-white">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        className="text-primary fw-bold"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}
