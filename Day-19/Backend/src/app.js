/**
 * server create karna
 */
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())//enable json data as reqest body
app.use(cookieParser())//enable cookie for jwt token setting

/**
 * require all routes
 */
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

/***
 * Use All the routes
 */
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)




module.exports = app