import React, { useState, useEffect, useContext } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container, Button, } from '@mui/material'
import AuthContext from '../../context/AuthContext';
import http from '../../utils/http'
function UserAccounts(){
    const [user,setUser]=useState([])
    useEffect(() => {
        http.get('/user/all').then(res => {
            setUser(res.data);
        })
    }, []);
    return(
        <>
         <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
          USER ACCOUNTS [{user.length}]
          </Typography>
        <table style={{width:'100%'}}>
            <tr style={
                {backgroundColor:'GrayText',color:'white'}
            }>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            <tbody style={{padding:'2px'}}>
                
                {user.map((users) => (
               <tr key={users._id} >
                <td style={{textAlign:'left'}}>{users.name}</td>
                <td style={{textAlign:'center'}}>{users.email}</td>
                <td style={{textAlign:'center'}}>{users.role}</td>
                </tr>
            ))}
                
            </tbody>
        </table>
        </>
    )
}

export default UserAccounts