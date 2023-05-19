import axios from 'axios';
import React, { useState } from 'react';
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(username, password, email, birthday, telephone);
    // };

    const createUser = (e) => {
        e.preventDefault();
        axios
            .post(`https://dry-chamber-05388.herokuapp.com/users`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
            .then((response) => {
                console.log(response.status);
                alert('Account Created');
            })
            .catch((error) => {
                console.log(error);
                alert('Unsuccessful');
            });
    };

    return (
        <Container className="content">
            <Row className="m-auto">
                <Col>
                    <CardGroup>
                        <Card
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.13)',
                            }}
                            className="card-styling p-4"
                        >
                            <Card.Body>
                                <Card.Title className="text-center text-white mb-4">
                                    Register
                                </Card.Title>
                                <Form onSubmit={(e) => createUser(e)}>
                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            placeholder="Username"
                                            type="text"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            minLength={8}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={(e) =>
                                                setBirthday(e.target.value)
                                            }
                                            className="mb-4 rounded pt-2 pb-2 input"
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        size="lg"
                                        variant="Primary"
                                        type="submit"
                                        className="text-white mb-4 bg-transparent button-styling border border-white"
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
