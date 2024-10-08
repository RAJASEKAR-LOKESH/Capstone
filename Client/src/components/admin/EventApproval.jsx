import React, { useState, useEffect, useContext } from 'react'
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container, Button } from '@mui/material'
import AuthContext from '../../context/AuthContext';
import http from '../../utils/http';
import { useNavigate } from 'react-router-dom'

function EventApproval() {
    const { user } = useContext(AuthContext);
    console.log(user, "USER FROM CONTEXT API");
    const [events, setEvents] = useState([]);
    // const [comment, setComment] = useState('');
    const navigate=useNavigate();

    
    useEffect(() => {
        http.get('/event/pending').then(res => {
            console.log(res.data, "POSTS FROM API");
            setEvents(res.data);
        })
    }, []);

    const handleApprove = (eventId) => {
        http.put(`/event/approving/${eventId}`).then(res => {
            console.log(res.data, "POSTS FROM API");

            setEvents(prevEvents => prevEvents.filter(events => events._id !== eventId));
        }) 
    };

    const handleReject = (eventId) => {
        http.delete(`/event/delete/${eventId}`).then(res => {
            console.log(res.data, "POSTS FROM API");

            setEvents(prevEvents => prevEvents.filter(events => events._id !== eventId));
        }) 
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {events.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography style={{ fontWeight: 'bold' }}>No Events Found For Approval</Typography>
    </Box>
            ) : (
                events.map(events => (
                    <Card key={events._id} sx={{ mt: 2, bgcolor: '#fof8ff' }}>
                        <CardContent>
                            <h2 className='title'>{events.title}</h2>
                            <Typography variant="body2" color="black" className='title1'>
                                {events.date}
                            </Typography>
                            <h4 className='location'>
                                Location: {events.location}
                            </h4>
                            <h4 className='time'>
                                Time: {events.time}
                            </h4>
                            {events.image && <img src={`${events.image}`} alt="Event"
                                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }} />}
                            <Typography variant="body1" gutterBottom className='desc'>
                                {events.description}
                            </Typography>  
                            <h3 className='price'>Ticket Price: {events.price}</h3>
                            
                            {user && user.role !== 'admin' && (
                                <button className='btn-register' onClick={() => handleRegister(events._id)}>
                                    REGISTER
                                </button>
                            )}

                            {user && user.role === 'admin' && (
                                <>
                                    <Button variant='contained' color='error' style={{ float: "right", marginLeft: "10px", marginRight: '10px' }} 
                                        onClick={() => handleReject(events._id)}>
                                        REJECT
                                    </Button>
                                    <Button variant='contained' color='success' style={{ float: "right" }} 
                                        onClick={() => handleApprove(events._id)}>
                                        APPROVE
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>

    )
}

export default EventApproval