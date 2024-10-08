    import React, { useContext, useState,useEffect } from 'react'
    import { Button, TextField, Typography, Container } from '@mui/material'
    import AuthContext from '../../context/AuthContext'
    import { useStateContext } from '../../context/StateContext'
    import { useNavigate,useParams } from 'react-router-dom'
    import http from '../../utils/http'
    import { jsPDF } from "jspdf";
    import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
    import 'react-toastify/dist/ReactToastify.css';

    function Ticket() {
        const { eventId } = useParams();
        const [event, setEvent] = useState('');
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [paymentId, setPaymentId] = useState('');

        const { counter, increment, decrement, initializeCounter } = useStateContext();
        const result = counter.result;
        const amount = counter.amount;

        const [paymentSuccessful,setPaymentSuccessful]=useState(false);
        const [phoneNumber, setPhoneNumber] = useState('');

        const { user } = useContext(AuthContext);
        const navigate = useNavigate();

        useEffect(() => {
            http.get(`event/eventdata/${eventId}`).then(res => {
                console.log(res.data, "POSTS FROM API");
                setEvent(res.data);
                initializeCounter(res.data.price);
            })
        }, [eventId],initializeCounter);

        const areFieldsFilled = () => {
            return name !== '' && email !== '' && phoneNumber !== '';
        };
        const notify = () =>toast.success('Booking Tickets Please Wait..', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        const addData=()=>{
            http.put(`event/register/${eventId}`,{amount,result,paymentId}).then(res => {
                    console.log("Data added successfully")
                    
                        navigate('/events'); // Delay navigation for a brief moment
                    
                    generateCustomPDF();
            })
        }

        const handlePay = async (e) => {
            e.preventDefault();
            let options={
                key:"rzp_test_25l6rZgahbSqo3",
                key_secret:"h3w0VIuYjiw6QkCtH2CZnEgL",
                amount: counter.result*100,
                currency:"INR",
                name:event.title,
                description:"Payment to confirm the Tickets",
                handler: function(response){
                    setPaymentId(response.razorpay_payment_id);
                    setPaymentSuccessful(true);
                },
                prefill:{
                    name:name,
                    email:email,
                    contact:phoneNumber
                },
                notes:{
                    address:"Razorpay Corporate Office"
                },
                theme:{
                    color:'#3399cc'
                }
            };
            let pay=new window.Razorpay(options);
            pay.open();
        }

        const generateCustomPDF = () => {
            const doc = new jsPDF({
                orientation: 'portrait', // or 'landscape'
                unit: 'pt',              // unit in points, millimeters, inches, etc.
                format: 'A4',             // page format, such as A4, letter, etc.
            });
        
            // Set a title font
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(26);
            doc.text("Ticket Confirmation", 200, 50, { align: 'center' });
        
            // Add a subtitle or event name
            doc.setFontSize(18);
            doc.setTextColor('#007BFF'); // Set text color to blue
            doc.text(`Event: ${event.title}`, 40, 100);
        
            // Add ticket details with custom font size and colors
            doc.setFontSize(14);
            doc.setTextColor('#000000'); // Set text color to black
            doc.text(`Name: ${name}`, 40, 130);
            doc.text(`Email: ${email}`, 40, 160);
            doc.text(`Phone: ${phoneNumber}`, 40, 190);
            doc.text(`Ticket Count: ${counter.amount}`, 40, 220);
            doc.text(`Total Price: ₹${counter.result}`, 40, 250);
        
            // Draw a line separator
            doc.setDrawColor(0); // Set the line color
            doc.line(40, 280, 560, 280); // Horizontal line from x1, y1 to x2, y2
        
            // Add custom footer
            doc.setFontSize(12);
            doc.text('Thank you for booking!', 40, 320);
        
            // Add a logo image (if you have an image)
            const imgUrl = event.image; // Example URL, replace with your image URL
            doc.addImage(imgUrl, 'PNG', 380, 40, 180, 180); // Add image at x=450, y=40 with width and height
        
            // Save the PDF
            doc.save(`Ticket_${event.title}.pdf`);
        };

    const handleRegister = (e) => {
        e.preventDefault();
        // Generate and automatically download the PDF after successful registration
        if (paymentSuccessful && areFieldsFilled()) {
            addData();
            notify()
              // Automatically download the PDF
           
        } else {
            alert("Payment not successful or fields are missing");
        }
    };
    return (
        <Container maxWidth="xs" style={{ marginTop: '20px', paddingTop: '10px', paddingBottom: '15px' }}>
                <h2 style={{textAlign:'center'}}>REGISTRATION FORM</h2>
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </TextField>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </TextField>
                    <TextField
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}>
                    </TextField>
                    <div className='price-area'>
                    <span style={{fontWeight:'bold',fontSize:'18px', marginRight:'10px'}}>Price: ₹{event.price}</span>
                    <span style={{fontSize:'18px'}}>Count: </span>
                    <button className="btn1">{counter.amount}</button>
                <button className="btn2" type='button'
                onClick={increment} disabled={paymentSuccessful}
                >🔼</button>
                <button className="btn3" type='button' disabled={paymentSuccessful}
                onClick={decrement}
                >🔽</button>
                <span className="price1">Amount: ₹{counter.result}</span>
                    </div>
                <p className='amount'>Total Price of {counter.amount} Tickets: <span style={{fontWeight:'bold'}}>₹{counter.result}</span></p>
                <Button variant='contained' color='success' disabled={paymentSuccessful} onClick={handlePay}>
                        CLICK TO PAY
                </Button>
                    
                    <Button type="submit" variant="contained" color="primary" fullWidth 
                    style={{marginTop:'17px'}} disabled={!paymentSuccessful || !areFieldsFilled()}>Register</Button>
                </form>
                <ToastContainer />
            </Container>
        );
    }

    export default Ticket