import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {
    Stack,
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';
import './profile-view.scss';

export const ProfileView = ({ movies, user, username }) => {
    const loggedInUser = user?.filter((user) => user.Username === username);

    console.log(loggedInUser);
    return (
        <Container className="content">
            <Row>
                <Col>
                    <Card className="info">
                        <Card.Body className="info">
                            <h4>Your Info</h4>
                            <p>Name:{user.Username}</p>
                            <p>Email:{user.Email}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Form>
                    <Col>
                        <Card className="update-info">
                            <Card.Body>
                                <Card.Title>Update Info</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            minLength={8}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                    <Button variant="Primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Form>
                <div>
                    <h2>Favorite Movies</h2>
                </div>
            </Row>
        </Container>
    );
};
