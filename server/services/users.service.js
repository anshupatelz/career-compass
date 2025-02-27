const User = require('../models/User');

// Service for users
class UserService {

    // Method for getting all users
    static async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Method for creating a user
    static async createUser(user) {
        try {
            console.log(user);
            return await User.create(user);
        } catch (error) {
            throw error;
        }
    }

    // Method for getting a user
    static async getUser(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // Method for updating a user
    static async updateUser(id, user) {
        try {
            return await User.findByIdAndUpdate(id, user, { new: true });
        } catch (error) {
            throw error;
        }
    }

    // Method for deleting a user
    static async deleteUser(id) {
        try {
            await User.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserService;