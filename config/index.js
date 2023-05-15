
const mongoose = require('mongoose');
const my_db = process.env.MONGO_URI

async function connect_db() {
    try {
        mongoose.set('strictQuery', true);
        const testConnect = await mongoose.connect(my_db)

        return testConnect
    } catch (error) {
        throw error;
    }
}


module.exports = { connect_db };
