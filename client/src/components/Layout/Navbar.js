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
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">ContactKeeper</Typography>
                <Box sx={{ marginLeft: 'auto' }}> {/* Flexbox pro umístění napravo */}
                    {userName ? (
                        <>
                            <StyledButton onClick={handleMenuClick}>
                                {userName}
                            </StyledButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <StyledButton href="/" sx={{ marginRight: 2 }}>
                                Login
                            </StyledButton>
                            <StyledButton href="/register">
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
