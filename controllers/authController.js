const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../validators/schemas');

const register = async (req, res) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const userExists = await User.findOne({ email: validatedData.email });

        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const user = await User.create(validatedData);
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        // req.user is set by the authMiddleware
        const user = await User.findById(req.user.id)
            .select('firstName lastName email role -_id');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

module.exports = { register, login, getUserProfile };