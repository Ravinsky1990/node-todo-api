const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose")
const {Todo} = require("./models/todo")
const {User} = require("./models/user")

//Set expressApp
const app = express();
app.use(bodyParser.json())

//Set routs
//Post todo
app.post("/todos", (req, res)=>{
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)
    })
})

//get all todos
app.get("/todos", (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>{
        res.status(400).send(e)
    })
})





app.listen(3000, ()=>{
    console.log("Started on port 3000!")
})




