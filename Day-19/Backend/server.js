require("dotenv").config()
const app = require("./src/app")
const ConnectToDB = require("./src/config/database")
const PORT = process.env.PORT || 3000


/***Connecting to DB */
ConnectToDB()

/**Starting server */
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})