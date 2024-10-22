// client/src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tady budeš volat API pro přihlášení
        console.log('Email:', email);
        console.log('Password:', password);

        // Resetování formuláře
        setEmail('');
        setPassword('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, mb: 2 }}>
                <Typography component="h1" variant="h5">
                    Přihlášení
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Heslo"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Přihlásit se
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
