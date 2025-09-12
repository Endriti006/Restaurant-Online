const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Add a new user
const addUser = async (req, res) => {
    const { fullName, email, password, role, phone } = req.body;

    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Complete the fields!' });
    }

    try {
        const duplicate = await User.findOne({ email }).exec();
        if (duplicate) {
            return res.status(400).json({ message: 'User Already Exists!' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const userRole = role || undefined;
        const result = await User.create({ fullName, email, password: hashedPwd, role: userRole, phone });
        res.status(201).json({ success: 'New User Created!', data: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Complete the fields!' });
    }

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(400).json({ message: 'User Not Found!' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid Password!' });
        }

        res.status(200).json({ success: 'User Logged In!', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required!' });
    }

    try {
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User Not Found!' });
        }

        res.status(200).json({ success: 'User Found!', user });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.status(200).json({ success: 'Users Retrieved!', users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Edit a user
const editUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, password, role, phone } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required!' });
    }

    try {
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User Not Found!' });
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            user.password = hashedPwd;
        }
        if (role) user.role = role;
        if (phone) user.phone = phone;

        const updatedUser = await user.save();
        res.status(200).json({ success: 'User Updated!', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required!' });
    }

    try {
        const user = await User.findByIdAndDelete(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User Not Found!' });
        }

        res.status(200).json({ success: 'User Deleted!', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await User.find({ role: 'Client' }).exec();
        res.status(200).json({ success: 'Clients Retrieved!', clients });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }).exec();
        res.status(200).json({ success: 'Admins Retrieved!', admins });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addUser, loginUser, getUserById, getAllUsers, editUser, deleteUser, getAllClients, getAllAdmins };
