const User = require('../models/User');
const EmailService = require('./email.service');

// Service for auth
class AuthService {

    // Method for logging out a user
    static async logout(user) {
        try {
            user.tokens = [];
            await user.save();
        } catch (error) {
            throw error;
        }
    }

    // Method for sending a forgot password email with resent password link
    static async forgotPassword(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            user.generatePasswordReset();
            await user.save();
        } catch (error) {
            throw error;
        }
    }

    // Method for resending a verification email 
    static async resendVerificationEmail(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            user.generateVerificationToken();
            await user.save();

            // Send verification email
            await user.sendVerificationEmail();

        } catch (error) {
            throw error;
        }
    }

    // Method for logging in a user
    static async login({ email, password }) {
        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Check if password is correct
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Incorrect password');
            }

            // Check if user is verified
            if (!user.isVerified) {
                throw new Error('Email not verified');
            }

            // Generate token
            const token = await user.generateAuthToken();

            return { user, token };

        } catch (error) {
            throw error;
        }
    }

    // Method for signing up a user
    static async signup({ name, email, password }) {
        try {

            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }

            // Create new user
            const newUser = new User({ name, email, password });
            await newUser.save();

            // Generate verification token
            const verificationToken = await newUser.generateVerificationToken();

            // Send verification email
            const verificationLink = `https://example.com/verification-email?token=${verificationToken}`;
            await EmailService.sendEmail(email, 'Verify Your Email', 'verification-email', { name, verificationLink });

        } catch (error) {
            throw error;
        }
    }

    // Method for resetting a user's password
    static async resetPassword({ token, password }) {
        try {
            // Find user by token
            const user = await User.findOne({
                'passwordResetToken': token,
                'passwordResetExpires': { $gt: Date.now() }
            });
            if (!user) {
                throw new Error('Invalid or expired token');
            }

            // Reset password
            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();

        } catch (error) {
            throw error;
        }

    }

    // Method for verifying a user's email
    static async verifyEmail({ token }) {
        try {
            // Find user by token
            const user = await User.findOne({ 'verificationToken': token });
            if (!user) {
                throw new Error('Invalid token');
            }

            // Verify email
            user.isVerified = true;

            // Remove verification token
            user.verificationToken = undefined;
            await user.save();
        } catch (error) {
            throw error;
        }
    }


}

module.exports = AuthService;