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
import BookedEvents from './BookedEvents';

function RegisteredData(){
    const { user } = useContext(AuthContext);
    const [event,setEvents]=useState([])
    useEffect(() => {
        http.get('/user/bookedEvents').then(res => {
            setEvents(res.data)
        })
    }, []);
    return(
        <>
          {event.length > 0 ? (
                // Only display this section if there are events
                <>
                    <Typography style={{ marginBottom: '5px' }}>Name: {user.name}</Typography>
                    <Typography style={{ marginBottom: '5px' }}>Email: {user.email}</Typography>
                    <Typography style={{ marginBottom: '10px' }}>Phone Number: {user.phone_number}</Typography>
                    <Typography style={{ textAlign: 'center', 
                        fontWeight: 'bold' }}>Find Registered Events</Typography>
                    <BookedEvents />
                </>
            ) : (
                // Display "No events found" if there are no events
                <Typography variant="h5" color="textSecondary" align="center" sx={{ mt: 2 }}>
                    No events found
                </Typography>
            )}
        </>
    )
}
export default RegisteredData