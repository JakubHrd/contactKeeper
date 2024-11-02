import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        <Card sx={{ borderRadius: 10, boxShadow: 3, marginBottom: 2, padding: 3}}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ mb: 2 }}>{contact.firstName ? contact.firstName.charAt(0) : '?'}</Avatar>
                <Typography variant="h6" align="center">
                    {contact.firstName ? `${contact.firstName} ${contact.lastName}` : 'Neznámý kontakt'}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Email: {contact.email || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Telefon: {contact.phone || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Společnost: {contact.company || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Pozice: {contact.position || 'N/A'}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button sx={{ borderRadius: 10, boxShadow: 3, marginBottom: 2 }} variant="outlined" size="small" color="success" onClick={() => handleEditContact(contact._id)}>
                    Upravit
                </Button>
                <Button sx={{ borderRadius: 10, boxShadow: 3, marginBottom: 2 }} variant="outlined" size="small" color="info" onClick={() => handleViewDetails(contact._id)}>
                    Zobrazit detaily
                </Button>
            </CardActions>
        </Card>
    );
};

export default ContactCard;
