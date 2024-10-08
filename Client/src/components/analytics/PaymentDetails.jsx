import React, { useState, useEffect, useContext } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container, Button, } from '@mui/material'
import AuthContext from '../../context/AuthContext';
import http from '../../utils/http'
function PaymentDetails(){
    const [user,setUser]=useState([])
    useEffect(() => {
        http.get('/event/paymentData').then(res => {
            setUser(res.data);
        })
    }, []);
    return(
        <>
         <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
         PAYMENT DETAILS
          </Typography>
        <table style={{width:'100%'}}>
            <tr style={
                {backgroundColor:'GrayText',color:'white'}
            }>
                <th>Name</th>
                <th>Amount Paid</th>
                <th>Payment ID</th>
            </tr>
            <tbody style={{padding:'2px'}}>
                {user.map((users) => (
               <tr key={users._id} >
                <td style={{textAlign:'left'}}>{users.user_name}</td>
                <td style={{textAlign:'center'}}>{users.amountPaid}</td>
                <td style={{textAlign:'center'}}>{users.paymentId}</td>
                </tr>
            ))}
                
            </tbody>
        </table>
        </>
    )
}

export default PaymentDetails