import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../utils/http'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateEvent() {
    const {eventId}=useParams()
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

    const notify = () => toast.success('Event Updated Successfully', {
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
            await http.put(`/event/updateEvent/${eventId}`, { title, description,sessions,speakers, date, time, location, price,total_ticket, image });
            notify(); // Call notify after successful update
            setTimeout(() => {
                navigate('/organizerdashboard');  // Delay navigation for a brief moment
            }, 2000); 
           // Redirect to feed page after successful registration
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        http.get(`event/eventdata/${eventId}`).then(res => {
            const event = res.data;
                setTitle(event.title)
                setDescription(event.description)
                setSessions(event.sessions)
                setSpeakers(event.speakers)
                setDate(event.date)
                setTime(event.time)
                setLocation(event.location)
                setPrice(event.price)
                setTotal_Ticket(event.total_ticket)
                setImage(event.image)
        })
    }, [eventId]);

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" 
            style={{marginTop:'5px'}}>UPDATE EVENT</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </TextField>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </TextField>
                <TextField
                    label="Sessions"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={sessions}
                    onChange={(e) => setSessions(e.target.value)}>
                </TextField>
                <TextField
                    label="Speakers"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={speakers}
                    onChange={(e) => setSpeakers(e.target.value)}>
                </TextField>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}>
                </TextField>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}>
                </TextField>
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}>
                </TextField>
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
                </TextField>
                <TextField
                    label="Total Ticket Count"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={total_ticket}
                    onChange={(e) => setTotal_Ticket(e.target.value)}>
                </TextField>
                <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>UPDATE</Button>
            </form>
            <ToastContainer/>
        </Container>
    )
}

export default UpdateEvent