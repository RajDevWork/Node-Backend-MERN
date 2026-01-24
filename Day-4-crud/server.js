const express = require("express")
const app = require("./src/app")

//temporary db
const notes = []


app.use(express.json())

app.post("/notes",(req,res)=>{
    let note = {"id":Math.floor(Math.random()*100),...req.body}
    notes.push(note)
    res.send({"message":"notes created!","notes":req.body})
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    const param = req.params.index;
    delete notes[param]
    res.send("Note deleted!")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Data updated successfully!")
})

app.put("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    notes[req.params.index].title = req.body.title
    res.send("Data updated successfully!")
})



app.listen(3000, ()=>{
    console.log("Server is running at port 3000")
})