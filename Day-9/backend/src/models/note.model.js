const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title:String, // required
    description:String // required
},
{
    timestamps:true // createdAt and updated at kaa time add hoga
}
)

const notesModel = mongoose.model("notes",notesSchema)

module.exports = notesModel