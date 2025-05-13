import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Avatar, CircularProgress, Button, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Details() {

    const[loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { email } = useParams();

    useEffect(() => {
        const storageUsers = localStorage.getItem('users');
        if (storageUsers) {
            
            const users = JSON.parse(storageUsers);
            const foundUser = users.find((user) => user.email == email);
            if (foundUser) {
                setUser(foundUser);
                setLoading(false);
            } else {
                setError('Email não encontrado');
                setLoading(false);
            }

        }else{

            setError('Usuário não encontrado');
            setLoading(false);
            return;

        }
    },[email])

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </Button>
                </Paper>
            </Box>
        );
    }

    const { latitude, longitude } = user.location.coordinates;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Box textAlign="center">
                        <Avatar
                            alt={`${user.name.first} ${user.name.last}`}
                            src={user.picture.large}
                            sx={{
                                width: 120,
                                height: 120,
                                margin: '0 auto',
                                border: '4px solid',
                                borderColor: 'primary.main',
                                boxShadow: 3,
                            }}
                        />
                        <Typography variant="h4" fontWeight="bold" mt={2}>
                            {user.name.first} {user.name.last}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" mt={1}>
                            {user.email}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            {user.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Localização: {user.location.city}, {user.location.country}
                        </Typography>
                    </Box>
                    <Box mt={4}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Localização no Mapa
                        </Typography>
                        <MapContainer
                            center={[parseFloat(latitude), parseFloat(longitude)]}
                            zoom={13}
                            style={{ height: '300px', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[parseFloat(latitude), parseFloat(longitude)]}>
                                <Popup>
                                    {user.name.first} {user.name.last}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box mt={4} textAlign="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(-1)}
                            sx={{ px: 3 }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}