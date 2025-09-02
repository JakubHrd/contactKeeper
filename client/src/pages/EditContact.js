// src/pages/EditContact.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm'; // Import ContactForm komponenty

const EditContact = () => {
    const { contactId } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactSource, setContactSource] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [discussionTopics, setDiscussionTopics] = useState('');
    const [avoidTopics, setAvoidTopics] = useState('');

    useEffect(() => {
        const fetchContact = async () => {
            try {
                console.log('contactId', { contactId });
                const response = await axios.get(`http://localhost:5000/api/contacts/${contactId}`);
                console.log('response', response);
                setContact(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setContactSource(response.data.contactSource);
                setCompany(response.data.company);
                setPosition(response.data.position);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setHobbies(response.data.hobbies);
                setDiscussionTopics(response.data.discussionTopics);
                setAvoidTopics(response.data.avoidTopics);
            } catch (error) {
                console.error('Chyba při načítání kontaktu:', error);
            }
        };
    
        fetchContact();
    }, [contactId]);
    

    if (!contact) {
        console.log('contact',{contact});
        return <Typography>Načítám...</Typography>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Vytvoření objektu updatedContact z hodnot stavu
        const updatedContact = {
            firstName,
            lastName,
            company,
            position,
            email,
            phone,
            hobbies,
            discussionTopics,
            avoidTopics,
            contactSource, // Přidání hodnoty pro source, pokud je potřeba
        };
        try {
            const response = await axios.put(`http://localhost:5000/api/contacts/${contactId}`, updatedContact);
            console.log('Response from server:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Chyba při aktualizaci kontaktu:', error);
        }
    };


    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    Přidat kontakt
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ marginBottom: '16px' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Jméno"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Příjmení"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Kde pracuje"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Pozice"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Telefon"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="contact-source-label">Odkud znáte kontakt</InputLabel>
                                    <Select
                                        labelId="contact-source-label"
                                        value={contactSource}
                                        onChange={(e) => setContactSource(e.target.value)}
                                    >
                                        <MenuItem value="práce">Práce</MenuItem>
                                        <MenuItem value="škola">Škola</MenuItem>
                                        <MenuItem value="dovolená">Dovolená</MenuItem>
                                        <MenuItem value="koníčky">Koníčky</MenuItem>
                                        <MenuItem value="ostatní">Ostatní</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Koníčky"
                                value={hobbies}
                                onChange={(e) => setHobbies(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Témata k diskusi"
                                value={discussionTopics}
                                onChange={(e) => setDiscussionTopics(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Témata, která vynechat"
                                value={avoidTopics}
                                onChange={(e) => setAvoidTopics(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Uložit úpravu
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditContact;
