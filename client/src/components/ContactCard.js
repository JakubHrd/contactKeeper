import React from 'react';
import { Box ,Card, CardContent, CardActions, Avatar, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactCard = ({ contact }) => {
    console.log('ContactCard',{contact});
    const navigate = useNavigate();

    const handleEditContact = (contactId) => {
        navigate(`/edit-contact/${contactId}`);
    };

    const handleViewDetails = (contactId) => {
        navigate(`/contact-details/${contactId}`);
    };

    return (
        <Card sx={{ borderRadius: 10, boxShadow: 3, mb: 2, p: 3, maxWidth: 300, mx: 'auto' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    sx={{
                        mb: 2,
                        width: 90,
                        height: 90,
                        boxShadow: 2,
                    }}
                    src="../../../avatar-male.webp"
                />
                <Typography variant="h5" align="center" fontWeight="bold">
                    {contact.firstName ? `${contact.firstName} ${contact.lastName}` : 'Neznámý kontakt'}
                </Typography>
                <Divider sx={{ width: '100%', my: 1 }} />

                {/* Rozdělení na dva sloupce */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                    <Box sx={{ flex: 1, textAlign: 'left', pl: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Email</strong> <br/> {contact.email || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Telefon</strong> <br/> {contact.phone || 'N/A'}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'left', pl: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Společnost</strong> <br/> {contact.company || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Pozice</strong> <br/> {contact.position || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

            <CardActions
                sx={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 1,
                    mt: 2,
                }}
            >
                <Button
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                        borderRadius: 10,
                        boxShadow: 3,
                        mt: 1,
                    }}
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => handleEditContact(contact._id)}
                >
                    Upravit
                </Button>
                <Button
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                        borderRadius: 10,
                        boxShadow: 3,
                        mb: 1,
                    }}
                    variant="outlined"
                    size="small"
                    color="info"
                    onClick={() => handleViewDetails(contact._id)}
                >
                    Zobrazit detaily
                </Button>
            </CardActions>
        </Card>
    );
};

export default ContactCard;
