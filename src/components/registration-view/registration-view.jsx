import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday, telephone);
    };

    return (
        <Container className="content">
            <Row>
                <Col>
                    <CardGroup>
                        <Card className="registration-card">
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            minLength={8}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={(e) =>
                                                setBirthday(e.target.value)
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="Primary"
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
