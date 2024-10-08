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


function OrganizerRevenue (){
    const [events,setEvents]=useState(null)
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        // Fetch all events
        http.get("/event/organizerEvents").then((res) => {
          // Filter events to show only those registered by the current use
          setEvents(res.data);
        });
      }, [user._id]);
      if (!events) {
        // Display a loading message or placeholder while data is being fetched
        return <div>Loading...</div>;
      }

    return(
        <>
        
                    <PieChart
            style={{ marginTop: "20px", marginBottom: "20px" }}
            series={[
              {
                data: [
                  { id: 0, value: events.grevenue, label: "GENERAL" },
                  { id: 1, value: events.vrevenue, label: "VIP" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Typography style={{fontWeight:'bold',marginTop:'30px'}}>
            Total Revenue: {events.total_revenue}
          </Typography>
        </>
    )
}
export default OrganizerRevenue