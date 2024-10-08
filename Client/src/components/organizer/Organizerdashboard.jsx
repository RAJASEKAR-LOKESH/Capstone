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

import OrganizerRegisteredEvents from "./OrganizerRegisteredEvents";
import OrganizerRevenue from "./OrganizerRevenue";
import TicketSales from "./TicketSales";


function Organizerdashboard() {
 
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: 0,
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          height: "450px",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
            overflow:'scroll',
            height:'450px'
          }}
        >
            <Typography style={{fontWeight:'bold'}}>REGISTERED EVENTS</Typography>
            <OrganizerRegisteredEvents></OrganizerRegisteredEvents>
        </Card>
        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
            overflow:'scroll',
            height:'450px'
          }}
        >
           <Typography style={{fontWeight:'bold'}}>REVENUE</Typography>
           <OrganizerRevenue></OrganizerRevenue>
        </Card>

        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
            height:'450px'
          }}
        >
          <Typography style={{fontWeight:'bold'}}>TICKET SALES</Typography>
          <TicketSales></TicketSales>
        </Card>
        
      </Container>
    </>
  );
}

export default Organizerdashboard
