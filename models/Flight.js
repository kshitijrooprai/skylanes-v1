const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    airline: {
        type: String,
        required: true,
    },
    departure: {
        city: { type: String, required: true },
        airport: { type: String, required: true },
        date: { type: Date, required: true },
    },
    arrival: {
        city: { type: String, required: true },
        airport: { type: String, required: true },
        date: { type: Date, required: true },
    },
    price: {
        type: Number,
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
