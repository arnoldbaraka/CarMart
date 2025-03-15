const express = require('express');
const Car = require('../models/Car');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find().populate('owner', 'username');
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new car
router.post('/', verifyToken, async (req, res) => {
    try {
        const car = new Car({ ...req.body, owner: req.user.id });
        const savedCar = await car.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
