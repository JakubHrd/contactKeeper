import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
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
        <Container sx={{paddingTop: 3}}>
            <Typography sx={{mb: 3}} variant="h4" gutterBottom align="center">
                Detail kontaktu
            </Typography>
            <Card sx={{ borderRadius: 10, boxShadow: 3, mb: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {contact.firstName} {contact.lastName}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography color="textSecondary"><strong>Email</strong><br/> {contact.email}</Typography>
                            <br/>
                            <Typography color="textSecondary"><strong>Telefon</strong><br/> {contact.phone}</Typography>
                            <br/>
                            <Typography color="textSecondary"><strong>Společnost</strong><br/> {contact.company}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography color="textSecondary"><strong>Pozice</strong><br/> {contact.position}</Typography>
                            <br/>
                            <Typography color="textSecondary"><strong>Koníčky</strong><br/> {contact.hobbies}</Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography color="textSecondary"><strong>Témata k diskuzi</strong> <br/> {contact.discussionTopics}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography color="textSecondary"><strong>Témata k vynechání</strong> <br/> {contact.avoidTopics}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ContactDetails;
