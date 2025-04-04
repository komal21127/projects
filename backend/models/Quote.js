const mongoose = require('mongoose');

// Define the schema for the Quote
const QuoteSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
