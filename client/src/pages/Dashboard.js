import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography , Container, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ContactSection from "../components/ContactSection";
import ContactCard from "../components/ContactCard";
import { motion } from 'framer-motion';


const Dashboard = () => {
    const { userId } = useUser();
    const [contacts, setContacts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('práce');
    const navigate = useNavigate();

    const contactCategories = {
        práce: 'Pracovní kontakty',
        škola: 'Školní kontakty',
        dovolená: 'Kontakty z dovolené',
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

    const filteredContacts = contacts.filter(contact => contact.contactSource === selectedCategory);

    return (
        <Container sx={{ display: 'flex', minHeight: '100vh', paddingTop: 3, minWidth: '100%', p:0 , m:0 }}>
            {/* Levý panel jako samostatná sekce */}
            <Box sx={{ width: '20%', padding: 2, borderRight: '1px solid #ddd' }}>
                <Stack spacing={2}> {/* Použijeme Stack pro vertikální uspořádání */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                        sx={{
                            borderRadius: 10,
                            boxShadow: 3,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: 5,
                                backgroundColor: '#5c6bc0', // Změna barvy při hoveru
                            },
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleAddContact}
                        fullWidth
                    >
                        Přidat nový kontakt
                    </Button>
                    </motion.div>
                    <Divider />

                    {/* Seznam kategorií jako tlačítka */}
                    {Object.keys(contactCategories).map((categoryKey) => (
                        <motion.div key={categoryKey} whileHover={{ scale: 1.05 }}>
                        <Button
                            key={categoryKey}
                            variant="outlined" // Tlačítka jako obrysová pro lepší vzhled
                            fullWidth
                            onClick={() => setSelectedCategory(categoryKey)}
                            sx={{
                                textAlign: 'left',
                                borderColor: selectedCategory === categoryKey ? '#1976d2' : '#ddd',
                                color: selectedCategory === categoryKey ? '#1976d2' : 'inherit',
                                borderRadius: 10,
                                boxShadow: 3,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    borderColor: '#1976d2',
                                    boxShadow: 4,
                                    color: '#1976d2',
                                },
                            }}
                        >
                            {contactCategories[categoryKey]}
                        </Button>
                        </motion.div>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', flexDirection: 'column', width: '75%' }}>
                {/* Zobrazení kategorie */}
                <Typography variant="h4" gutterBottom>
                    {contactCategories[selectedCategory]}
                </Typography>

                {/* Zobrazení všech kontaktů */}
                <Box sx={{ padding: 2 }}>
                    <Grid container spacing={3}> {/* Používáme Grid pro rozložení kontaktů */}
                        {filteredContacts.map((contact) => (
                            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={contact._id}> {/* Upravujeme velikosti pro různé obrazovky */}
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <ContactCard contact={contact} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
};

export default Dashboard;
