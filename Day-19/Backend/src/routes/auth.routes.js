const express = require("express")
const authController = require("../controller/auth.controller")

const authRouter = express.Router()


/**
 * Register Route
 * endpoint: /api/auth/register
 */
authRouter.post("/register",authController.registerController)


/**
 * Login Route
 * endpoint: /api/auth/login
 */

authRouter.post("/login",authController.loginController)



module.exports = authRouter