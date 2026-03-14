const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    followee:{
        type:String
    },
    status:{
        type:String,
        default:'pending',
        enum:{
            values:['pending','accept','reject'],
            message:'Status can noly be pending,accept and reject'
        }
    }

},{
    timestamps:true
})

followSchema.index({follower:1,followee:1},{unique:true}) // schema level validation for one user only follow one time another user

const followModel = mongoose.model('follows',followSchema)

module.exports = followModel