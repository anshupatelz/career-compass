const UserService = require('../services/users.service');

// Module for getting all users
exports.getUsers = (req, res) => {
    try {
        const users = UserService.getUsers();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Module for creating a user
exports.createUser = (req, res) => {
    try {
        const user = UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Module for getting a user
exports.getUser = (req, res) => {
    try {
        const user = UserService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Module for updating a user
exports.updateUser = (req, res) => {
    try {
        const user = UserService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Module for deleting a user
exports.deleteUser = (req, res) => {
    try {
        UserService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}