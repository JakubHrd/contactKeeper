import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Grid } from '@mui/material';
import ContactCard from './ContactCard'; // Přidej správnou cestu

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

const ContactCarousel = ({ contacts}) => {
    const contactChunks = chunkArray(contacts, 6); // Rozdělíme kontakty na skupiny po 6

    return (
        <Carousel showThumbs={false} infiniteLoop>
            {contactChunks.map((chunk, index) => (
                <Box key={index} sx={{ padding: 1 }}>
                    <Grid container spacing={3}>
                        {chunk.map((contact) => (
                            <Grid item xs={12} sm={6} md={4} key={contact._id}>
                                <ContactCard
                                    contact={contact}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Carousel>
    );
};

export default ContactCarousel;
