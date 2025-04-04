const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection (replace with your MongoDB Atlas URI)
mongoose.connect('mongodb+srv://komalmanefyco:<db_password>@clusterone.xrhfwqp.mongodb.net/?retryWrites=true&w=majority&appName=Clusterone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Define the Quote model
const Quote = mongoose.model('Quote', new mongoose.Schema({
    text: String,
    author: String
}));

// API Endpoints

// Get all quotes
app.get('/api/quotes', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new quote
app.post('/api/quotes', async (req, res) => {
    const { text, author } = req.body;
    const quote = new Quote({ text, author });

    try {
        await quote.save();
        res.status(201).json(quote);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a quote
app.put('/api/quotes/:id', async (req, res) => {
    const { text, author } = req.body;
    try {
        const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, { text, author }, { new: true });
        res.json(updatedQuote);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a quote
app.delete('/api/quotes/:id', async (req, res) => {
    try {
        await Quote.findByIdAndDelete(req.params.id);
        res.status(200).send('Quote deleted');
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
