const UserService = require('../services/users.service');

// Module for getting all users
exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Module for creating a user
exports.createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Module for getting a user
exports.getUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Module for updating a user
exports.updateUser = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Module for deleting a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};