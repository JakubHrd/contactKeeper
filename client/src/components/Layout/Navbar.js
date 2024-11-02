// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white', // Změňte barvu tlačítka na bílou
}));

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { userName, setUserName } = useUser();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        setUserName(null); // Aktualizace stavu po odhlášení
        navigate('/');
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(90deg, #1e90ff, #32cd32)', // gradient s modrou, zelenou a oranžovou
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // jemný stín
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                    }}
                >
                    ContactKeeper
                </Typography>
                <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    {userName ? (
                        <>
                            <StyledButton
                                onClick={handleMenuClick}
                                sx={{
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {userName}
                            </StyledButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{
                                    mt: 2,
                                    '& .MuiPaper-root': {
                                        borderRadius: '8px',
                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                                    },
                                }}
                            >
                                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <StyledButton
                                href="/"
                                sx={{
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    marginRight: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Login
                            </StyledButton>
                            <StyledButton
                                href="/register"
                                sx={{
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Register
                            </StyledButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
