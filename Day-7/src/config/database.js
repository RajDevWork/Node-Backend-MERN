const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected with DB!")
        })
        .catch(err => console.error(err))
}

module.exports = connectToDB
