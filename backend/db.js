const mongoose = require('mongoose');

const connectDB = async () => {
const MONGO_URI = 'mongodb+srv://admin:12345@cluster0.vzdbd38.mongodb.net/Users?retryWrites=true&w=majority';
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully.');
    }catch{
        console.error('MongoDB connection failed :', err);
        process.exit(1);
    }
};

module.exports = connectDB;