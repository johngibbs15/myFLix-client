import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';

export function LoginView({ onLoggedIn }) {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        onLoggedIn(username);
    };

    return (
        <Container className="content">
            <Row>
                <Col>
                    <CardGroup>
                        <Card className="login-card">
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="mt-3"
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
