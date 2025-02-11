const Reservation = require('../models/Reservation');
const Flight = require('../models/Flight');
const { reservationSchema } = require('../validators/schemas');

const createReservation = async (req, res) => {
    try {
        const validatedData = reservationSchema.parse(req.body);
        const flight = await Flight.findById(validatedData.flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (flight.seatsAvailable < validatedData.passengers.length) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const reservation = await Reservation.create({
            user: req.user.id,
            flight: validatedData.flightId,
            passengers: validatedData.passengers,
            totalPrice: flight.price * validatedData.passengers.length,
        });

        await Flight.findByIdAndUpdate(validatedData.flightId, {
            $inc: { seatsAvailable: -validatedData.passengers.length },
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id })
            .populate('flight')
            .sort('-createdAt');
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createReservation, getUserReservations };