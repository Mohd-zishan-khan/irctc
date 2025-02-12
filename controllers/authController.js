const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const register = (req, res) => {
    const { username, password, role } = req.body;
    User.register(username, password, role, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully' });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { register, login };