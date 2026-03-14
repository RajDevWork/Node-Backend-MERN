const mongoose = require("mongoose")


async function ConnectToDB(){
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connect to DB")
    
}

module.exports = ConnectToDB