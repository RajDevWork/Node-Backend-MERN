const express = require("express")

const app = express() // server create


app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.get("/about",function(req,res){
    res.send("This is about page!")
})

//server start
app.listen(3000,()=>{
    console.log("Server running at port 3000")
})