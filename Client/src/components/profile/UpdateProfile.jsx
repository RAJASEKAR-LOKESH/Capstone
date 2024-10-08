import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import http from '../../utils/http'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProfile()
{
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phone_number);
            setAge(user.age);
        }
    }, [user]);
    const notify = () => toast.success('Profile Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser=await http.put('/user/updateProfile', { name, email, phone_number,age });
            updateUser(updatedUser.data); 
            notify();
            setTimeout(() => {
                navigate('/profile'); // Delay navigation for a brief moment
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    }
    return(
        <Container maxWidth="xs" style={{backgroundColor:'gainsboro',marginTop:'10px',
        paddingTop:'10px',paddingBottom:'10px'}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>Update Profile</Typography>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}>
            </TextField>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </TextField>
            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}>
            </TextField>
            <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                value={age}
                onChange={(e) => setAge(e.target.value)}>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
        </form>
        <ToastContainer />
    </Container>

    )
}
export default UpdateProfile