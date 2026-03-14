const userModel = require("../model/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


/**Handle user registration */
async function registerController(req,res){
    const {username,email,password,bio,profile_image} = req.body

    const isUserExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserExists){
        return res.status(409).json({
            message:"User already exists "+isUserExists.email===email?'Email already taken':'Username already present'
        })
    }
    const hashPass = await bcryptjs.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashPass,
        bio,
        profile_image
    })
    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    /**Password and other sensetive data remove karne ke liye */
    let {password:_, ...restUserDetails} = await user._doc

    res.status(201).json({
        "message":"User created successfully!",
        user:restUserDetails
    })
}


/**Hanfle user login */


async function loginController(req,res){
    const {username,email,password} = req.body


    //check whether user exists or not

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isvalidPassword = await bcryptjs.compare(password,user.password)
    if(!isvalidPassword){
        return res.status(401).json({
            message:"Invalid Credential"
        })
    }

    const token = await jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token)

    //skip password
    const {password:_,...restUserDetails} = user._doc
    
    res.status(200).json({
        message:"User loggedIn Successfully!",
        restUserDetails
    })

}

module.exports = {
    registerController,
    loginController
}


