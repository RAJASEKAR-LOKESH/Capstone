import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Paper, Typography, Avatar, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Paper style={{ padding: '20px',backgroundColor:'gainsboro',width:'50%',marginLeft:'25%',marginTop:'2%',
        textAlign:'center' }}>
            <Avatar src={user.profilePicture} alt={user.username} style={{ width: '100px', height: '100px',
                 margin: '0 auto' }} />
            <Typography style={{marginTop:'15px'}} variant="h6">Name: {user.name}</Typography>
            <Typography style={{marginTop:'10px'}} variant="body1">Email: {user.email}</Typography>
            <Typography style={{marginTop:'10px'}} variant="body1">Phone Number: {user.phone_number}</Typography>
            <Typography style={{marginTop:'10px'}} variant="body1">Age: {user.age}</Typography>
            <Button style={{marginTop:'15px',marginRight:'10px'}} variant="contained" color="secondary" onClick={()=>navigate('/updateProfile')}>Update Profile</Button>
            <Button style={{marginTop:'15px'}} variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Paper>
    )
}

export default Profile