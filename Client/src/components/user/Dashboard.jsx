import Events from "../Events"
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

import UpcomingEvents from "./UpcomingEvents";
import BookedEvents from "./BookedEvents";
import RegisteredData from "./RegisteredData";

function Dashboard()
{
    return(
        <>
         <Container
        maxWidth="xl"
        sx={{
          mt: 0,
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          height: "auto",
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
          }}
        >
            <Typography style={{fontWeight:'bold'}}>
                UPCOMING EVENTS
            </Typography>
          <UpcomingEvents></UpcomingEvents>
         
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
          }}
        >
            <Typography style={{fontWeight:'bold'}}>
                BOOKED EVENTS
            </Typography>
         
            <BookedEvents></BookedEvents>
        
        </Card>

        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "left",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
          }}
        >
         <Typography style={{fontWeight:'bold',textAlign:'center'}}>REGISTERED DATA</Typography>
        
         <RegisteredData></RegisteredData>
       
        </Card>
      </Container>
        </>
    )
}

export default Dashboard