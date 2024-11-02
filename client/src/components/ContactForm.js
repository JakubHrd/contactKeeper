// src/pages/AddContact.js
import React from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ContactForm from '../components/ContactForm'; // Ujisti se, že cesta je správná

const AddContact = () => {
    const { userId } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (newContact) => {
        if (!userId) {
            console.error('Uživatelské ID není dostupné.');
            return;
        }

        try {
            const contactData = {
                userId,
                ...newContact,
            };

            const response = await axios.post('http://localhost:5000/api/newContact', contactData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Kontakt přidán:', response.data);
            navigate('/dashboard'); // Přesměrování na dashboard po úspěšném přidání
        } catch (error) {
            console.error('Chyba při přidávání kontaktu:', error);
            alert('Došlo k chybě při přidávání kontaktu. Zkontrolujte konzoli pro více informací.');
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Přidat kontakt
                </Typography>
                <ContactForm
                    initialContact={null}
                    onSubmit={handleSubmit}
                    buttonText="Přidat kontakt"
                />
            </Box>
        </Container>
    );
};

export default AddContact;
