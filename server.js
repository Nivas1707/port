// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection URL (replace with your actual MongoDB URL)
const mongoUrl = 'mongodb+srv://nivas654pownraj:Suji1707@cluster0.iscea.mongodb.net/cakeShop?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Endpoint to handle form submission
app.post('/contact', async (req, res) => {
    const { fullName, email, phoneNumber, subject, message } = req.body;

    const newContact = new Contact({
        fullName,
        email,
        phoneNumber,
        subject,
        message
    });

    try {
        await newContact.save();
        res.status(200).send('Message received successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to save message');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
