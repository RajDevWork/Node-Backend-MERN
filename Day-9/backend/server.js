/**
 * server start
 */
const app = require("./src/app")
require("dotenv").config() // access the env variables
const connectToDB = require("./src/config/database")
const PORT = process.env.PORT || 3000




/**
 * Connecting to DB
 */
connectToDB()

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})