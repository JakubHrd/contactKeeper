import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Login = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const { setUserName,setUserId  } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    // Funkce pro kontrolu e-mailu
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Zadejte platnou e-mailovou adresu.');
        } else {
            setEmailError('');
        }
    };

    // Funkce pro kontrolu hesla
    const checkPassword = (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*]/.test(value);

        const strength = hasUpperCase + hasLowerCase + hasNumber + hasSpecialChar;

        if (strength === 4) {
            setPasswordStrength('Silné heslo');
            setPasswordError('');
        } else if (strength === 3) {
            setPasswordStrength('Středně silné heslo');
            setPasswordError('');
        } else {
            setPasswordStrength('Slabé heslo');
            setPasswordError('Heslo musí obsahovat velká i malá písmena, číslice a speciální znaky.');
        }
    };

    // Při změně e-mailu
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    // Při změně hesla
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        checkPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Zkontrolovat, jestli jsou všechny validace úspěšné
        if (emailError || passwordError) {
            setError('Prosím, opravte chyby před přihlášením.');
            return;
        }
        console.log('data' , {email,password})
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            console.log('response', {response, 'response.data': response.data});

            setUserName(response.data.name);
            setUserId(response.data.userId);
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
                    background: 'linear-gradient(135deg, #f0f0f0, #faf5f5)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                    borderRadius: '16px',
                    padding: '30px',
                    maxWidth: '400px',
                    margin: '50px auto',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Sign In
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                        sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
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
                        onChange={handlePasswordChange}
                        error={!!passwordError}
                        helperText={passwordError || passwordStrength}
                        sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#1e90ff',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#32cd32',
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mb: 2,
                            borderColor: '#1e90ff',
                            color: '#6200ea',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                borderColor: '#32cd32',
                                color: '#4500b5',
                            },
                        }}
                        href="/register"
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
