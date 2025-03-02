/**
 * Utility function to format a date to a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date');
    }
    return date.toISOString().split('T')[0];
}

/**
 * Utility function to generate a random string of specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} - The generated random string.
 */
function generateRandomString(length) {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error('Invalid length');
    }
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Utility function to validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function validateEmail(email) {
    if (typeof email !== 'string') {
        throw new Error('Invalid email');
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

module.exports = {
    formatDate,
    generateRandomString,
    validateEmail
};