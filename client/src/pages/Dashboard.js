import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar, CardActions, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ContactCard from "../components/ContactCard";
import ContactSection from "../components/ContactSection";

const Dashboard = () => {
    const { userId } = useUser();
    const [contacts, setContacts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('práce');
    const navigate = useNavigate();

    const contactCategories = {
        práce: 'Pracovní kontakty',
        přátelé: 'Přátelé',
        koníčky: 'Kontakty z koníčků',
        ostatní: 'Ostatní kontakty',
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contacts', {
                    params: { userId }
                });
                setContacts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchContacts();
    }, [userId]);

    const handleAddContact = () => {
        navigate('/add-contact');
    };

    const handleEditContact = (contactId) => {
        navigate(`/edit-contact/${contactId}`);
    };

    const handleViewDetails = (contactId) => {
        navigate(`/contact-details/${contactId}`);
    };

    const filteredContacts = contacts.filter(contact => contact.contactSource === selectedCategory);

    return (
        <Container sx={{ display: 'flex', height: '100vh' }}>
            {/* Levý postranní panel */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}
            >
                <Box sx={{ padding: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddContact}
                        fullWidth
                    >
                        Přidat nový kontakt
                    </Button>
                </Box>
                <Divider />
                <List>
                    {Object.keys(contactCategories).map((categoryKey) => (
                        <ListItem
                            button
                            key={categoryKey}
                            selected={selectedCategory === categoryKey}
                            onClick={() => setSelectedCategory(categoryKey)}
                        >
                            <ListItemText primary={contactCategories[categoryKey]} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Pravá strana s kontakty */}
            <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {contactCategories[selectedCategory]}
                </Typography>

                <Grid container spacing={2}>
                    {filteredContacts.map(contact => (
                        <Grid item xs={12} sm={6} md={4} key={contact._id}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ marginRight: 2 }}>{contact.name.charAt(0)}</Avatar>
                                    <Box>
                                        <Typography variant="h6">{contact.name} {contact.surname}</Typography>
                                        <Typography variant="body2" color="textSecondary">{contact.company}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleEditContact(contact._id)}>
                                        Upravit
                                    </Button>
                                    <Button size="small" onClick={() => handleViewDetails(contact._id)}>
                                        Zobrazit detaily
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
