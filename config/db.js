const mongoose = require('mongoose')

const connectToDatabase = async () => {

    try {
        mongoose.connect(process.env.MONGO_URL)
            .then((con) => {
                console.log('Database connection successfully', con.connection.host);
            })
            .catch(err => {
                console.log('Error while connecting to database', err.message);
            })
    } catch (error) {
        console.log("Internal connection error while connecting to database ");
    }

}

module.exports = connectToDatabase;