const { json } = require('express')
const followModel = require('../model/follow.model')
const userModel = require('../model/user.model')

async function followUserController(req,res){
    const followerusername = req.user.username
    const followeeusername = req.params.username

    /**check whether followee exists or not */
    const isUserExists = await userModel.findOne({username:followeeusername})
    if(!isUserExists){
        return res.status(404).json({
            message:'You are trying to follow the user that does not exists'
        })
    }

    /**Check whether follower and followee both are same */
    if(followeeusername===followerusername){
        return res.status(400).json({
            message:'You can not follow yourself!'
        })
    }

    /**Check whether user already follows the followee */
    const isAlreadyFollow = await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(isAlreadyFollow){
        return res.status(200).json({
            message:`You are already following ${followeeusername}`,
            isAlreadyFollow
        })
    }


    const follow = await followModel.create({
        follower:followerusername,
        followee:followeeusername
    })

    res.status(201).json({
        message:`You are now following ${followeeusername}`,
        follow
    })

}


async function unfollowUserController(req,res){

    const followerusername = req.user.username
    const followeeusername = req.params.username

    /**check whether followee exists or not */
    const isUserExists = await userModel.findOne({username:followeeusername})
    if(!isUserExists){
        return res.status(404).json({
            message:'You are trying to unfollow the user that does not exists'
        })
    }

    /**Check whether follower and followee both are same */
    if(followeeusername===followerusername){
        return res.status(400).json({
            message:'You can not unfollow yourself!'
        })
    }

    /**Check whether following or not */
    const isFollowing = await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })

    if(!isFollowing){
        return res.status(409).json({
            message:'You are trying to unfollow contact that is not in your follower list'
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message:`You are unfollowing ${followeeusername}`
    })



}

async function changeFollowerStatus(req,res){

    const followerusername = req.user.username
    const followeeusername = req.params.username
    const followStatus = req.body.status

    /**check whether followee exists or not */
    const isUserExists = await userModel.findOne({username:followeeusername})
    if(!isUserExists){
        return res.status(404).json({
            message:'You are trying to unfollow the user that does not exists'
        })
    }

    /**Check whether following or not */
    const isFollowing = await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })

    if(!isFollowing){
        return res.status(409).json({
            message:'You are trying to change follow status of contact that is not in your follower list'
        })
    }

    const updatedStatus = await followModel.findOneAndUpdate({_id:isFollowing._id},{status:followStatus},{new:true})

    res.status(200).json({
        message:'Follower status updated successfully!',
        updatedStatus
    })



}



module.exports = {
    followUserController,
    unfollowUserController,
    changeFollowerStatus
}