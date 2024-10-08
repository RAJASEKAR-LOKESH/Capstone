import React, { useState, useEffect, useContext } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container, Button, } from '@mui/material'
import AuthContext from '../../context/AuthContext';
import http from '../../utils/http'

function Revenue() {
    const [event,setEvent] = useState([])
    let general=0;
    let vip=0;
    useEffect(() => {
        http.get('/event/all').then(res => {
            setEvent(res.data);
        })
    }, []);
    event.map((events)=>{
        general=general + events.grevenue
        vip=vip+events.vrevenue
    })
    return (
      <>
         <PieChart style={{marginTop:'20px',marginBottom:'20px'}}
      series={[
        {
          data: [
            { id: 0, value: general, label: 'General' },
            { id: 1, value: vip, label: 'VIP' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
    <Typography>Total Revenue: ₹{general + vip}</Typography>
      </>
    )
  }
  
  export default Revenue
  