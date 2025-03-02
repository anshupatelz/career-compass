const AuthService = require('../services/auth.service');

// Module for logging out a user
exports.logout = async (req, res) => {
    try {
        await AuthService.logout(req.user);
        res.status(200).send({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error logging out",
            error: error.message
        });
    }
};

// Module for sending a forgot password email with resent password link
exports.forgotPassword = async (req, res) => {
    try {
        await AuthService.forgotPassword(req.body.email);
        res.status(200).send({
            message: 'Password reset email sent'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error sending password reset email",
            error: error.message
        });
    }
}

// Module for resending a verification email
exports.resendVerificationEmail = async (req, res) => {
    try {
        await AuthService.resendVerificationEmail(req.body.email);
        res.status(200).send({
            message: 'Verification email resent'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error resending verification email",
            error: error.message
        });
    }
}

// Module for logging in a user
exports.login = async (req, res) => {
    try {
        const user = await AuthService.login(req.body);
        res.status(200).json({
            message: 'Login successful',
            data: user
        });
    } catch (error) {
        res.status(400).send({
            message: "Error logging in",
            error: error.message
        });
    }
};

// Module for signing up a user
exports.signup = async (req, res) => {
    try {
        // console.log(req.body);
        await AuthService.signup(req.body);
        res.status(201).send({
            message: 'Signup successful'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error signing up",
            error: error.message
        });
    }
};

// Module for resetting a user's password
exports.resetPassword = async (req, res) => {
    try {
        await AuthService.resetPassword(req.body);
        res.status(200).send({
            message: 'Password reset successful'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error resetting password",
            error: error.message
        });
    }
};

// Module for verifying a user's email
exports.verifyEmail = async (req, res) => {
    try {
        await AuthService.verifyEmail(req.body);
        res.status(200).send({
            message: 'Email verified'
        });
    } catch (error) {
        res.status(400).send({
            message: "Error verifying email",
            error: error.message
        });
    }
};