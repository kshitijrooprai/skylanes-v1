const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const authController = require('../controllers/authController');
const flightController = require('../controllers/flightController');
const reservationController = require('../controllers/reservationController');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Flight routes
router.post('/flights', authMiddleware, adminMiddleware, flightController.createFlight);
router.get('/flights/search', authMiddleware, flightController.searchFlights);

// Reservation routes
router.post('/reservations', authMiddleware, reservationController.createReservation);
router.get('/reservations', authMiddleware, reservationController.getUserReservations);

router.get('/user/profile', authMiddleware, authController.getUserProfile);

module.exports = router;