import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Grid, Typography } from '@mui/material';
import ContactCard from './ContactCard'; // Přidej správnou cestu

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

const ContactCarousel = ({ contacts }) => {
    const contactChunks = chunkArray(contacts, 6); // Rozdělíme kontakty na skupiny po 6
    console.log('Contact Chunks:', contactChunks); // Logování pro diagnostiku

    return (
        <Carousel showThumbs={false} infiniteLoop>
            {contactChunks.length > 0 ? (
                contactChunks.map((chunk, index) => (
                    <Box key={index} sx={{ padding: 1, backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={3} justifyContent="center">
                            {chunk.map((contact) => (
                                <Grid item xs={12} sm={6} md={4} key={contact._id}>
                                    <ContactCard contact={contact} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Žádné kontakty k zobrazení.
                </Typography>
            )}
        </Carousel>
    );
};

export default ContactCarousel;
