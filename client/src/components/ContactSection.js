import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactCarousel from './ContactCarousel'; // Přidej správnou cestu

const ContactSection = ({ category, contacts}) => {
    return (
        <Box sx={{ mb: 4, border: '1px solid #ddd', borderRadius: 10, padding: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#1976d2' }}>
                {category}
            </Typography>
            {contacts.length > 0 ? (
                <ContactCarousel contacts={contacts} />
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Žádné kontakty k zobrazení.
                </Typography>
            )}
        </Box>
    );
};

export default ContactSection;
