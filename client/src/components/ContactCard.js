import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact}) => {
    const navigate = useNavigate();

    const handleEditContact = (contactId) => {
        navigate(`/edit-contact/${contactId}`);
    };

    const handleViewDetails = (contactId) => {
        navigate(`/contact-details/${contactId}`);
    };
    return (
        <Card sx={{ borderRadius: 10, boxShadow: 3 }}>
            <CardContent>
                <Avatar sx={{ mb: 2 }}>{contact.firstName.charAt(0)}</Avatar>
                <Typography variant="h6">
                    {contact.firstName} {contact.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Email: {contact.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Telefon: {contact.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Společnost: {contact.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Pozice: {contact.position}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small" color="success" onClick={() => handleEditContact(contact._id)}>
                    Upravit
                </Button>
                <Button variant="outlined" size="small" color="info" onClick={() => handleViewDetails(contact._id)}>
                    Zobrazit detaily
                </Button>
            </CardActions>
        </Card>
    );
};

export default ContactCard;

/*<Container>
            <ContactSection category={'koníčky'} contacts={contacts} onEdit={handleEditContact} onViewDetails={handleViewDetails} />
            <ContactCarousel contacts={contacts} onEdit={handleEditContact} onViewDetails={handleViewDetails} />
            <ContactCard
                contact={contacts[0]}
                onEdit={handleEditContact}
                onViewDetails={handleViewDetails}
            />

            <Typography variant="h6" gutterBottom>
                Kontakty:
            </Typography>
            {Object.keys(contactCategories).map((source) => {
                const filteredContacts = contacts.filter(contact => contact.contactSource === source);
                if (filteredContacts.length === 0) return null;

                const contactChunks = chunkArray(filteredContacts, 6); // Rozdělíme kontakty na skupiny po 6

                return (
                    <Box key={source} sx={{ mb: 4, border: '1px solid #ddd', borderRadius: 10, padding: 2, backgroundColor: '#f9f9f9' }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#1976d2' }}>
                            {contactCategories[source]}
                        </Typography>
                        {contactChunks.length > 1 ? (
                            <Carousel showThumbs={false} infiniteLoop>
                                {contactChunks.map((chunk, index) => (
                                    <Box key={index} sx={{ padding: 1 }}>
                                        <Grid container spacing={3}>
                                            {chunk.map((contact) => (
                                                <Grid item xs={12} sm={6} md={4} key={contact._id}>
                                                    <Card sx={{ borderRadius: 10, boxShadow: 3,padding: 1 }}>
                                                        <CardContent>
                                                            <Box display="flex" alignItems="center" mb={2}>
                                                                <Avatar sx={{ mr: 2 }}>{contact.firstName.charAt(0)}</Avatar>
                                                                <Typography variant="h6">
                                                                    {contact.firstName} {contact.lastName}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Email: {contact.email}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Telefon: {contact.phone}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Společnost: {contact.company}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Pozice: {contact.position}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => handleEditContact(contact._id)}
                                                            >
                                                                Upravit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => handleViewDetails(contact._id)}
                                                            >
                                                                Zobrazit detaily
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                ))}
                            </Carousel>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredContacts.map((contact) => (
                                    <Grid item xs={12} sm={6} md={4} key={contact._id}>
                                        <Card sx={{ borderRadius: 10, boxShadow: 3,padding: 1 }}>
                                            <CardContent>
                                                <Box display="flex" alignItems="center" mb={2}>
                                                    <Avatar sx={{ mr: 2 }}>{contact.firstName.charAt(0)}</Avatar>
                                                    <Typography variant="h6">
                                                        {contact.firstName} {contact.lastName}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    Email: {contact.email}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Telefon: {contact.phone}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Společnost: {contact.company}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Pozice: {contact.position}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEditContact(contact._id)}
                                                >
                                                    Upravit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => handleViewDetails(contact._id)}
                                                >
                                                    Zobrazit detaily
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                );
            })}
        </Container>*/
