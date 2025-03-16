const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectMongo;