import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactCard from "../components/ContactCard";
import ContactCarousel from "../components/ContactCarousel";
import ContactSection from "../components/ContactSection";
const Dashboard = () => {
    const { userId } = useUser();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contacts', {
                    params: { userId }
                });
                setContacts(response.data);
                console.log('contacts data', {contacts});
                console.log('contacts data first', {'contact':contacts[0]});
            } catch (err) {
                console.error(err);
            }
        };

        fetchContacts();
    }, []);

    const handleAddContact = () => {
        navigate('/add-contact');
    };

    const handleEditContact = (contactId) => {
        navigate(`/edit-contact/${contactId}`);
    };

    const handleViewDetails = (contactId) => {
        navigate(`/contact-details/${contactId}`);
    };

    // Funkce pro rozdělení kontaktů do skupin po 6
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };
    const contactCategories = {
        práce: 'Pracovní kontakty',
        škola: 'Školní kontakty',
        dovolená: 'Kontakty z dovolené',
        koníčky: 'Kontakty z koníčků',
        ostatní: 'Ostatní kontakty',
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
            {Object.keys(contactCategories).map((category) => {
                // Filtrování kontaktů podle kategorie
                const categoryContacts = contacts.filter(contact => contact.contactSource === category);
                {console.log('categoryContacts', {category,categoryContacts})}
                // Pokud nejsou žádné kontakty v kategorii, sekci nezobrazuj
                if (categoryContacts.length === 0) return null;

                return (
                    <ContactSection
                        category={contactCategories[category]}
                        contacts={categoryContacts}
                    />
                );
            })}
        </Container>


    );
};

export default Dashboard;
