// src/pages/EditContact.js
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm'; // Import ContactForm komponenty

const EditContact = () => {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/contacts/${contactId}`);
                setContact(response.data);
            } catch (error) {
                console.error('Chyba při načítání kontaktu:', error);
            }
        };

        fetchContact();
    }, [contactId]);

    const handleSubmit = async (updatedContact) => {
        try {
            await axios.put(`http://localhost:5000/api/contacts/${contactId}`, updatedContact);
            navigate('/dashboard');
        } catch (error) {
            console.error('Chyba při aktualizaci kontaktu:', error);
        }
    };

    if (!contact) {
        return <Typography>Načítám...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upravit kontakt
            </Typography>
            <ContactForm
                initialContact={contact}
                onSubmit={handleSubmit}
                buttonText="Uložit změny"
            />
        </Container>
    );
};

export default EditContact;
