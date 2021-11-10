import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useAppContext } from "../lib/contextLib";


export default function Login({ setUser }) {
    const { userHasAuthenticated } = useAppContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(username, password);
            setUser(username)
            localStorage.setItem("user", JSON.stringify(username));
            userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="center">
                    <Button type="submit" disabled={!validateForm()} variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', border: '2px solid', margin: '10px' }}>Login</Button>
                </div>
            </Form>
        </div >
    );
}