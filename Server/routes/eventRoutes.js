const Events=require('../models/eventModel')
const Users=require('../models/userModel')
const nodemailer = require('nodemailer');
const auth=require('../middleware/auth')
const express=require('express')
const router=express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., 'gmail', 'smtp')
  auth: {
      user: 'rajasekarrr323@gmail.com',  // Replace with your email
      pass: 'xrqi azsq vfws ajiv',   // Replace with your email password or app-specific password
  },
});

router.post('/addEvent',auth,async(req,res)=>{
    const {title,description,sessions,speakers,date,time,location,price,total_ticket,image}=req.body;
  
    const eventData= new Events({
        title,
        description,
        sessions,
        speakers,
        date,
        time,
        location,
        price,
        total_ticket,
        image,
        registeredBy: {
          user_id: req.user._id  
      }
    })    
    
    const user= await Users.findById(req.user._id);
    if(user.role!='admin'){
          user.role="organizer"
    }
    await eventData.save();
    await user.save();
    res.send(eventData)
})

router.put('/updateEvent/:eventId', auth, async (req, res) => {
  const event = await Events.findById(req.params.eventId);
  if (!event) {
      return res.status(404).send("Event Not Found");
  }

  event.title = req.body.title;
  event.description = req.body.description;
  event.sessions = req.body.sessions;
  event.speakers = req.body.speakers;
  event.date = req.body.date;
  event.time = req.body.time;
  event.location = req.body.location;
  event.price = req.body.price;
  event.total_ticket = req.body.total_ticket;
  event.image = req.body.image;

  await event.save();

  // Fetch registered users' IDs from the event's gticket field
  const userIds = event.gticket.map(ticket => ticket.user_id); // Adjust field name as necessary

  // Fetch user details for all registered users
  const users = await Users.find({ _id: { $in: userIds } });
  
  // Send email notifications to each registered user
  const promises = users.map(user => {
      const mailOptions = {
          from: 'rajasekarrr323@gmail.com', // Sender address
          to: user.email, // List of receivers
          subject: `Event Update: ${event.title}`, // Subject line
          text: `Hello ${user.name},\n\nThe event "${event.title}" has been updated.\n\nUpdated Details:\nDate: ${event.date}\nLocation: ${event.location}\nSessions: ${events.sessions}\nSpeakers: ${events.speakers}\n\nThank you for your understanding!\n\nBest regards,\nEvent Organizer`, // Plain text body
      };
     
      // Return the promise from sendMail
      return transporter.sendMail(mailOptions);
  });

  try {
      await Promise.all(promises); // Wait for all emails to be sent
      res.send(event);
      console.log('Emails sent successfully');
  } catch (error) {
      console.error('Error sending emails:', error);
      return res.status(500).send({ error: 'Error sending email' });
  }


});

router.get('/paymentData', auth, async (req, res) => {
  try {
    // Fetch all events with status "approved" and only include the gticket field
    const events = await Events.find({ status: "approved" }, "gticket");

    // Extract the gticket arrays from each event
    const allGtickets = events.map(event => event.gticket);

    // Flatten the array of arrays to combine all tickets
    const flattenedGtickets = allGtickets.flat();

    // Send the flattened gticket array as the response
    res.json(flattenedGtickets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

router.get("/organizerEvents", auth, async (req, res) => {
  try {
    // Find events where registeredBy.user_id matches the current user's ID
    const events = await Events.findOne({ "registeredBy.user_id": req.user._id });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/all", auth, async (req, res) => {
    try {
      const event = await Events.find({"status":"approved"}).sort({ date: 1 });
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/pending", auth, async (req, res) => {
    try {
      const event = await Events.find({"status":"pending"})
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.put("/approving/:eventId", auth, async (req, res) => {
    try {
      const event = await Events.findById(req.params.eventId)
      event.status='approved'
      await event.save();
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/eventdata/:eventId", auth, async (req, res) => {
    try {
      const event = await Events.findById(req.params.eventId)
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });



  router.put('/register/:eventId', auth, async (req, res) => {
    try {
        const event = await Events.findById(req.params.eventId);
        if (event.totalTicketSaled >= event.total_ticket) {
            return res.send("Tickets Sold");
        }

        const ticketBought = Number(req.body.amount);
        const amountPaid = Number(req.body.result);
        const registeredData = {
            user_id: req.user._id,
            user_name: req.user.name,
            ticketBought: ticketBought,
            amountPaid: amountPaid,
            paymentId: req.body.paymentId
        };
        event.gticket.push(registeredData);
        event.gticket_count = event.gticket_count + ticketBought;
        event.totalTicketSaled = event.gticket_count + event.vticket_count;
        event.grevenue = event.grevenue + amountPaid;
        event.total_revenue = event.grevenue + event.vrevenue;

        const userData = await Users.findById(req.user._id);
        const addData = { event_id: event._id };
        userData.registered_events.push(addData);

        await userData.save();
        await event.save();

        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: userData.email, // List of receivers (the registered user's email)
            subject: `Registration Confirmation for ${event.title}`, // Subject line
            text: `Hello ${req.user.name},\n\nYou have successfully registered for the event "${event.title}".\n\nEvent Details:\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nSessions: ${event.sessions}\nSpeakers: ${event.speakers}\nNumber of Tickets: ${ticketBought}\n\nThank you for registering!\n\nBest regards,\nEvent Organizer`, // Plain text body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Only send the response after the email is sent
        res.send(event);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred' });
    }
});


router.delete('/delete/:eventId',auth,async(req,res)=>{
    
    try{
        const logged_user=await Users.findById(req.user._id)
        if(logged_user.role=="admin")
        {
            const event=await Events.findOneAndDelete({_id:req.params.eventId})
            if(event){
                res.send({
                    deletedEvent:event,
                    message:"Event Deleted Successfully and cannot be found in DB"
                })
            }
            else{
                res.send("Event Not Found");
            }
        }
        else{
            res.send("Only Admin can delete the event")
        }
    }
       catch(e){
        res.send("Some internal error")
       }
})

router.delete('/cancel/:eventId',auth,async(req,res)=>{
    const event=await Events.findById(req.params.eventId)
    const ticketIndex = event.gticket.findIndex(
        (data) => data.user_id.toString() === req.user._id.toString()
      );

      const user=await Users.findById(req.user._id)
      const userIndex = user.registered_events.findIndex(
        (data) => data.event_id.toString() === req.params.eventId.toString()
      );

      console.log(ticketIndex)
      if (ticketIndex === -1) {
        return res.status(404).send("Registered details not found");
      }
      event.gticket.splice(ticketIndex, 1);
      user.registered_events.splice(userIndex, 1);

    await event.save();
    await user.save();
    res.send("Booking Cancelled Successfully")
})





module.exports=router