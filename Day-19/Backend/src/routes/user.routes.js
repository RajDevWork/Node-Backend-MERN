const express = require('express')
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * @route /api/users/:username
 * @description follow user based on id
 * @access private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @route /api/users/unfollow/:username
 * @description Unfollow the user based on username
 * @access private
 */

userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUserController)

/**
 * @route Patch: /api/users/follow/:username
 * @description Change the status of follow request
 */
userRouter.patch("/follow/:username",identifyUser,userController.changeFollowerStatus)



module.exports = userRouter