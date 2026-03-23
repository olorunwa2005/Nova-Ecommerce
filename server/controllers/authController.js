const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    // Simple validation
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (hashing is handled in User model as per current implementation)
    const user = await User.create(email, password, fullName, role || 'customer');

    // Generate Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};
