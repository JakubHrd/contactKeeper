// src/pages/Register.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Importujte UserContext

const Register = () => {
    const navigate = useNavigate();
    const { setUserName } = useUser(); // Získejte setUserName z UserContext
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });

            // Uložení uživatelského jména do kontextu
            setUserName(name); // Nastavte uživatelské jméno z registrace

            // Přesměrování na Dashboard po úspěšné registraci
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : "Registration failed";
            setError(errorMessage);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        href="/" // Odkaz na přihlašovací stránku
                    >
                        Already have an account? Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
