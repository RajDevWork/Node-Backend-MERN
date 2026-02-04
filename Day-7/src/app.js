const express = require("express")
const noteModel = require("./models/note.model")

app = express();
app.use(express.json())

/**
 * Post route
 */

app.post("/notes", async(req,res)=>{
    const {title,description} = req.body;

    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        "message":"Created!",
        note
    })

})

/**
 * get method
 */
app.get("/notes", async(req,res)=>{

    const notes = await noteModel.find()
    res.status(200).json({
        "message":"Success",
        notes
    })

})

/**
 * DELETE note
 */


app.delete("/notes/:id", async(req,res)=>{
    const deletedID = req.params.id
    const deletedNote = await noteModel.findByIdAndDelete(deletedID)
    if(!deletedNote){
       return res.status(404).json({"message":"Notes not found"})
    }
    
    res.status(204).json({"message":"Notes deleted successfully!"})

})


/**
 * Update Notes
 */
app.put("/notes/:id",async(req,res)=>{
    const updatedID = req.params.id
    const {title,description} = req.body

    const updatedData = await noteModel.findByIdAndUpdate(updatedID,{title,description},{new:true})

    if(!updatedData){
       return res.status(404).json({'message':'Notes not found!'})
    }

    res.status(204).json({"message":"Updated successfully!",updatedData})
})



module.exports = app