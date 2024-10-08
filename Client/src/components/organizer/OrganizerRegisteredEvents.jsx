import React, { useState, useEffect, useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Card,
  Box,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import http from "../../utils/http";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";

function OrganizerRegisteredEvents (){
  const navigate=useNavigate()
    const [events,setEvents]=useState([])
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        // Fetch all events
        http.get("/event/organizerEvents").then((res) => {
          // Filter events to show only those registered by the current use
          setEvents(res.data);
        });
      }, [user._id]);
      const handleUpdate=(eventId)=>{
        navigate(`/updateEvent/${eventId}`);
      }

      const exportData = () => {
        // Prepare data for export
        const csvData = events.gticket.map((event) => {
            return {
                Name: event.user_name,
                Tickets: event.ticketBought, // Assuming 'ticketCount' contains number of tickets sold
            };
        });

        // Convert data to CSV format
        const csvRows = [
            ['Registered Name', 'Number of Tickets'],  // Header row
            ...csvData.map(event => [event.Name, event.Tickets])  // Data rows
        ];

        // Create a CSV string
        const csvContent = csvRows.map(row => row.join(',')).join('\n');

        // Create a blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'events_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return(
        <>
         
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
                      

            <ButtonGroup variant="contained" aria-label="Basic button group"
             sx={{marginTop:'10px'}}>
            {events.status === "approved" ? (
             <Button color="success" size="small" style={{marginRight:'2px'}}>APPROVED</Button>
            ) : (
              <Button color="error" size="small" style={{marginRight:'2px'}}>PENDING</Button>
            )}
                <Button size="small" 
                style={{marginRight:'2px'}}
                onClick={()=>{handleUpdate(events._id)}}
                >UPDATE</Button>
                <Button size="small" onClick={exportData} variant="contained" color="secondary"
                >EXPORT DATA</Button>
              </ButtonGroup>
              </CardContent>
                   
                </Card>
         
        </>
    )
}
export default OrganizerRegisteredEvents