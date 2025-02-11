const Flight = require('../models/Flight');
const { flightSchema } = require('../validators/schemas');

const createFlight = async (req, res) => {
    try {
        const validatedData = flightSchema.parse(req.body);
        const flight = await Flight.create(validatedData);
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        const query = {
            'departure.city': from,
            'arrival.city': to,
            'departure.date': {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
            },
            seatsAvailable: { $gt: 0 },
        };

        const flights = await Flight.find(query);
        res.json(flights);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createFlight, searchFlights };