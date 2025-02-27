module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/CareerCompass',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    port: process.env.PORT || 8080
}