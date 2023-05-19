import { useState } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export const ProfileView = ({ user, token }) => {
    console.log(user.Username);

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const updateUser = (e) => {
        e.preventDefault();
        axios
            .put(
                `https://dry-chamber-05388.herokuapp.com/users/${user.Username}`,
                {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                }
            )
            .then((response) => {
                console.log(response.status);
                alert('Update Successful');
            })
            .catch((error) => {
                console.log(error);
                alert('Update unsuccessful');
            });
    };

    const deleteUser = (e) => {
        e.preventDefault();
        axios
            .delete(
                `https://enigmatic-hamlet-36885.herokuapp.com/users/${user.Username}`
            )
            .then((response) => {
                console.log(response.status);
                alert('Profile has been deleted!');
                window.open('/register', '_self');
            })
            .catch((error) => {
                console.log(error);
                alert('Update unsuccessful');
            });
    };

    return (
        <Form onSubmit={(e) => updateUser(e)} style={{ marginTop: '50px' }}>
            <Card
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.13)',
                }}
                className="card-styling p-4 m-auto w-50"
            >
                <Card.Title className="text-white text-center fs-1">
                    Update Info
                </Card.Title>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="password"
                            required
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            className="mb-4"
                            type="date"
                            placeholder="Birthday"
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        className="mb-2 bg-transparent button-styling border border-white text-white"
                        variant="Primary"
                        type="submit"
                    >
                        Update Info
                    </Button>
                    <Button
                        onClick={deleteUser}
                        variant="Primary"
                        type="submit"
                        className="mb-2 bg-transparent button-styling border border-white text-white"
                    >
                        Delete Account
                    </Button>
                </Card.Body>
            </Card>
        </Form>
    );
};
