import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Register = () => {
    const navigate = useNavigate();
    const { setUserName,setUserId  } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Zadejte platnou e-mailovou adresu.');
        } else {
            setEmailError('');
        }
    };

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

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        checkPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Kontrola shody hesel
        if (password !== confirmPassword) {
            setError("Hesla se neshodují.");
            return;
        }

        // Kontrola chyb v e-mailu a heslu
        if (emailError || passwordError) {
            setError('Prosím, opravte chyby před registrací.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            console.log('response' , {response});

            // Nastavení uživatelského jména a navigace na dashboard
            setUserName(response.data.name);
            setUserId(response.data.userId);
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : "Registrace selhala";
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
                    Register
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
                        sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
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
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!passwordError}
                        helperText={passwordError || passwordStrength}
                        sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
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
                        Register
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
                        href="/"
                    >

                        Already have an account? Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;