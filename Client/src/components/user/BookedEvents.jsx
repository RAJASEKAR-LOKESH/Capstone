
import React, { useState, useEffect, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AuthContext from '../../context/AuthContext';
import http from '../../utils/http';
import { useNavigate } from 'react-router-dom'


function BookedEvents(){
    const [event,setEvents]=useState([])
    const { user } = useContext(AuthContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    };
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number); // Split time into hours and minutes
        const isPM = hours >= 12; // Determine if it's PM
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format; handle 0 hours case
        const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two digits for minutes
    
        return `${formattedHours}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;
    };
    
    
    useEffect(() => {
        http.get('/user/bookedEvents').then(res => {
            setEvents(res.data)
        })
    }, []);

    return(
        <>
                     <Container maxWidth="sm" sx={{ mt: 4 }} 
                     style={{ overflow: 'scroll', height: '435px' }}>
                {event.length === 0 ? ( // Check if the events array is empty
                    <Typography variant="h5" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        No events found
                    </Typography>
                ) : (
                    event.map(events => (
                        <Card key={events._id} sx={{ mt: 2, bgcolor: '#f0f8ff' }}>
                            <CardContent>
                                <h2 className="title">{events.title}</h2>
                                <Typography variant="body2" color="black" className="title1">
                                {formatDate(events.date)}
                                </Typography>
                                <h4 className="location">Location: {events.location}</h4>
                                <h4 className="time">Time: {formatTime(events.time)}</h4>
                                {events.image && (
                                    <img
                                        src={`${events.image}`}
                                        alt="Event"
                                        style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
                                    />
                                )}
                                <Typography variant="body1" gutterBottom className="desc">
                                    {events.description}
                                </Typography>
                                <h3 className="price">Ticket Price: ₹{events.price}</h3>
                                <button className="btn-register">BOOKED</button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Container>

        </>
    )
}
export default BookedEvents