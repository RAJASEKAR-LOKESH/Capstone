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
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import AuthContext from "../../context/AuthContext";
import http from "../../utils/http";


function TicketSales (){
    const [events,setEvents]=useState([])
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        // Fetch all events
        http.get("/event/organizerEvents").then((res) => {
          // Filter events to show only those registered by the current use
          setEvents(res.data);
        });
      }, [user._id]);

    return(
        <>

        <Gauge
        
  value={events.totalTicketSaled}
  startAngle={-110}
  endAngle={110}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 40,
      transform: 'translate(0px, 0px)',
    },
    marginBottom:'-50px'
  }}
  text={
     ({ value, valueMax }) => `${value} / ${events.total_ticket}`
  }
/>
<Typography style={{fontWeight:'bold'}}>Tickets Not Sold: {events.total_ticket-events.totalTicketSaled}</Typography>
        </>
    )
}
export default TicketSales