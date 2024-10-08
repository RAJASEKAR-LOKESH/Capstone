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

function UpcomingEvents() {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    // const [comment, setComment] = useState('');
    const navigate=useNavigate();


    useEffect(() => {
        http.get('/event/all').then(res => {
            console.log(res.data, "POSTS FROM API");
            setEvents(res.data);
            setFilteredEvents(res.data);
        })
    }, []);
    const handleRegister = (eventId) => {
        navigate(`/ticket/${eventId}`); // Ensure the navigate function is called only when the button is clicked
    };

    const filterByDropdown = (events) => {
        // Apply dropdown filter
        if (filterOption === 'upcoming') {
            return events.filter(event => new Date(event.date) > new Date()); // Upcoming events
        }
        return events; // Return all if no filter selected
    };

        // Function to handle search/filtering
        const handleSearch = () => {
            let filtered = events;
    
            if (searchQuery.trim() !== '') {
                filtered = filtered.filter(event => {
                    const lowercasedQuery = searchQuery.toLowerCase();
    
                    // Check if the query matches event name, date, location, price, or time
                    return (
                        event.title.toLowerCase().includes(lowercasedQuery) ||
                        event.date.toLowerCase().includes(lowercasedQuery) ||
                        event.location.toLowerCase().includes(lowercasedQuery) ||
                        event.price.toString().includes(lowercasedQuery) ||  // Convert price to string
                        event.time.toLowerCase().includes(lowercasedQuery)
                    );
                });
            }
            filtered = filterByDropdown(filtered);
            setFilteredEvents(filtered); // Update filtered events based on query
        };

        const handleChange = (event) => {
            setFilterOption(event.target.value); // Update selected filter option
            handleSearch(); // Trigger search/filtering after dropdown selection
        };
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
            handleSearch();
        }, [searchQuery,filterOption]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }} style={{overflow:'scroll',height:'435px'}}>
           <input type='textfield' 
           value={searchQuery} 
           placeholder='Search for event name, location, date, time'
           onChange={(e) => setSearchQuery(e.target.value)}
           style={{padding:'8px',Width:'50%'}}>
           </input>
            <Button 
            variant="contained" 
            onClick={handleSearch}
            style={{marginLeft:'5px',marginTop:'-0.5px'}}>
            <SearchIcon></SearchIcon>
            </Button>
        
            {filteredEvents.map(events => (
                <Card key={events._id} sx={{ mt: 2, bgcolor: '#fof8ff' }}>
                    <CardContent>
                       <h2 className='title'>{events.title}</h2>
                        <Typography variant="body2" color="black" className='title1'>
                        {formatDate(events.date)}
                        </Typography>
                        <h4 className='location'>
                            Location: {events.location}
                        </h4>
                        <h4 className='time'>
                        Time: {formatTime(events.time)}
                        </h4>
                        {events.image && <img src={`${events.image}`} alt="Event"
                            style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }} />}
                         <Typography variant="body1" gutterBottom className='desc'>
                            {events.description}
                        </Typography>  
                       
                        <h3 className='price'>Ticket Price: ₹{events.price}</h3>
                        <button className='btn-register' onClick={() => handleRegister(events._id)}>
                        REGISTER
                        </button>
                    </CardContent>
                   
                </Card>
            ))}
        </Container>
    )
}

export default UpcomingEvents