const { z } = require('zod');

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
});

const flightSchema = z.object({
    flightNumber: z.string(),
    airline: z.string(),
    departure: z.object({
        city: z.string(),
        airport: z.string(),
        date: z.string().datetime(),
    }),
    arrival: z.object({
        city: z.string(),
        airport: z.string(),
        date: z.string().datetime(),
    }),
    price: z.number().positive(),
    seatsAvailable: z.number().int().min(0),
});

const reservationSchema = z.object({
    flightId: z.string(),
    passengers: z.array(z.object({
        firstName: z.string(),
        lastName: z.string(),
        seatNumber: z.string(),
    })),
});

module.exports = {
    userSchema,
    flightSchema,
    reservationSchema,
};