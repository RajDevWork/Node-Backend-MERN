const express = require("express")
const postController = require("../controller/post.controller")
const identifyUser = require('../middlewares/auth.middleware')
const multer = require('multer')
const postRouter = express.Router()
const upload = multer({storage:multer.memoryStorage()})

/**
 * route: /api/posts/
 * desc: create posts
 * [protected]
 */
postRouter.post("/",identifyUser,upload.single("ImageFile"),postController.createPostController)

/***
 * route: /api/posts/
 * Get all posts 
 * [protected]
 */
postRouter.get("/",identifyUser,postController.getPostController)

/**
 * Route: /api/posts/:postId
 * get individual post
 * [protected]
 */
postRouter.get("/:postId",identifyUser,postController.getPostDetailsController)

/**
 * @route /api/posts/like/:postId
 * @description like a post
 * @access protected
 */
postRouter.post("/like/:postId",identifyUser,postController.likePostController)



module.exports = postRouter