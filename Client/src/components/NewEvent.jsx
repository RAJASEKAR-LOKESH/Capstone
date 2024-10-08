import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import http from '../utils/http'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sessions, setSessions] = useState('');
    const [speakers, setSpeakers] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [total_ticket, setTotal_Ticket] = useState('');
    const [image, setImage] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const notify = () => toast.success('Event Created Successfully Wait for Admin Approval ', {
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
            await http.post('/event/addevent', { title, description,sessions,speakers, date, time, location, price,total_ticket, image });
            notify();
            setTimeout(() => {
                navigate('/events'); // Delay navigation for a brief moment
            }, 3000);
             // Redirect to feed page after successful registration
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" style={{marginTop:'5px'}}> Event Registration</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </TextField>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </TextField>
                <TextField
                    label="Sessions"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={sessions}
                    onChange={(e) => setSessions(e.target.value)}>
                </TextField>
                <TextField
                    label="Speakers"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={speakers}
                    onChange={(e) => setSpeakers(e.target.value)}>
                </TextField>
                <TextField
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}>
                </TextField>
                <TextField
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}>
                </TextField>
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}>
                </TextField>
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
                </TextField>
                <TextField
                    label="Total Ticket Count"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={total_ticket}
                    onChange={(e) => setTotal_Ticket(e.target.value)}>
                </TextField>
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </form>
            <ToastContainer/>
        </Container>
    )
}

export default NewEvent