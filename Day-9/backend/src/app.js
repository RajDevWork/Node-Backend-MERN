/**
 * server create
 */
const express = require("express")
const notesModel = require("./models/note.model")
const cors  = require("cors")
app = express()

app.use(cors())
app.use(express.json()) // req.body ko parse karne ke liye
app.use(express.static("./public"))



/***Creating defferent routes for data exchange*/
/**
 * POST : /api/notes/
 * DESC: create notes by using req.body json with title and description
 */

app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body
    const note = await notesModel.create({title,description})
    
    res.status(201).json({
        "message":"Note created",
        note
    })
})

/**
 * GET: /api/notes/
 * DESC: get all the list of notes in array of object format
 */
app.get("/api/notes",async(req,res)=>{
    const notes = await notesModel.find()
    res.status(200).json(
        {
            "message":"success!",
            "notes":notes
        }
    )
})

/***
 * GET : /api/notes/:id
 * DESC: get individual note by id
 */

app.get("/api/notes/:id",async(req,res)=>{

    const {id} = req.params

    const note = await notesModel.findById(id)

    res.status(200).json({
        "message":"success",
        note
    })

})



/***
 * DELETE: /api/notes/:id
 * DESC: delete notes using note id from query params
 */
app.delete("/api/notes/:id",async(req,res)=>{
    const {id} = req.params

    await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        "message":"Deleted!"
    })

})

/**
 * PATCH: /api/notes/:id
 * DESC: Update notes descption using id from req.params and req.body
 */
app.patch("/api/notes/:id",async(req,res)=>{
    const {id} = req.params
    const {description} = req.body

    const updatedNote = await notesModel.findByIdAndUpdate(id,{description:description},{new:true})
    res.status(200).json({
        "message":"Note Updated",
        "note":updatedNote
    })

})




module.exports = app