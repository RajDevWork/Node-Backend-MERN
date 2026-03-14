const postModel = require("../model/post.model")
const likeModel = require("../model/like.model")
const { ImageKit, toFile } = require("@imagekit/nodejs");
const jwt = require('jsonwebtoken')

// import ImageKit, { toFile } from '@imagekit/nodejs';
async function createPostController(req,res){


    // console.log(decoded)


    const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });

   // 🔥 Buffer ko File object me convert karna
    const fileObject = await toFile(
      req.file.buffer,
      req.file.originalname
    );

    const uploadedFile = await client.files.upload({
      file: fileObject,
      fileName: req.file.originalname,
      folder: "/insta-clone-mern"
    });


    /**Create post */

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:uploadedFile.url,
        user: req.user.id
    })
    

    res.status(201).json({
        message:'Post created successfully!',
        post
    })
}
async function getPostController(req,res){

   
    const userID = req.user.id

    const post = await postModel.find({
        user:userID
    })
    if(!post){
        return res.status(404).json({
            message:'Post not found!'
        })
    }
    res.status(200).json({
        message:'Post fetched successfully!',
        post
    })
}

async function getPostDetailsController(req,res){

    
    const userID = req.user.id
    const postID = req.params.postId

    const post = await postModel.findById({_id:postID})
    if(!post){
        return res.status(404).json({
            message:'Post Not found'
        })
    }
    const isValidUser = post.user.toString() === userID
    if(!isValidUser){
        return res.status(403).json({
            message:'Forbidden Access'
        })
    }

    res.status(200).json({
        message:'Post fetched successfully!',
        post
    })

}


async function likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId


    /**check whether post exists or not */
    const isPostExists = await postModel.findById(postId)
    if(!isPostExists){
        return res.status(404).json({
            message:'You are trying to like the post that does not exists!'
        })
    }

    /**Check whether already liked or not */
    const alreadyLiked = await likeModel.findOne({
        user:username,
        post:postId
    })

    if(alreadyLiked){
        return res.status(200).json({
            message:'You have already like this post!',
            alreadyLiked
        })
    }

    const likePost = await likeModel.create({
        user:username,
        post:postId
    })

    res.status(201).json({
        message:'You have liked the post!',
        likePost
    })

}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}