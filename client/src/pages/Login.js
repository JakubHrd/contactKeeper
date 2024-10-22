// src/pages/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios pro HTTP požadavky
import { useUser } from '../context/UserContext'; // Importujte UserContext

const Login = () => {
    const navigate = useNavigate();
    const { setUserName } = useUser(); // Získejte setUserName z UserContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            // Uložení uživatelského jména do kontextu
            setUserName(response.data.name); // Nastavte uživatelské jméno z odpovědi serveru

            // Přesměrování na Dashboard po úspěšném přihlášení
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : "Login failed";
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
                    Sign In
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        href="/register" // Odkaz na registrační stránku
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
