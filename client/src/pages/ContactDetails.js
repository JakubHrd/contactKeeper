import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContactDetails = () => {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/contacts/${contactId}`);
                console.log('response', {response});
                setContact(response.data);
            } catch (error) {
                console.error('Chyba při načítání kontaktu:', error);
            }
        };

        fetchContact();
    }, [contactId]);

    if (!contact) {
        return <Typography>Načítám...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Detail kontaktu
            </Typography>
            <Box mb={2}>
                <Typography variant="h6">
                    {contact.firstName} {contact.lastName}
                </Typography>
                <Typography color="textSecondary">Email: {contact.email}</Typography>
                <Typography color="textSecondary">Telefon: {contact.phone}</Typography>
                <Typography color="textSecondary">Společnost: {contact.company}</Typography>
                <Typography color="textSecondary">Pozice: {contact.position}</Typography>
                <Typography color="textSecondary">Koníčky: {contact.hobbies}</Typography>
                <Typography color="textSecondary">Témata k diskuzi: {contact.discussionTopics}</Typography>
                <Typography color="textSecondary">Témata k vynechání: {contact.avoidTopics}</Typography>
            </Box>
        </Container>
    );
};

export default ContactDetails;
