import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contacts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Předpokládáme, že token je uložen v localStorage
                    }
                });
                setContacts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchContacts();
    }, []);

    const handleAddContact = () => {
        navigate('/add-contact'); // Přesměrování na stránku pro přidání nového kontaktu
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Můj Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddContact}
                sx={{ mb: 3 }}
            >
                Přidat nový kontakt
            </Button>
            <Typography variant="h6" gutterBottom>
                Kontakty:
            </Typography>
            <List>
                {contacts.map((contact) => (
                    <ListItem key={contact._id}>
                        <ListItemText primary={`${contact.name} (${contact.email})`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;
