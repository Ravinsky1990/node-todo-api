const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

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

//fetch individual todo
app.get('/todos/:id', (req, res)=>{
    var id = req.params.id
    //res.status(200).send({id})
     if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
           return res.status(400).send()
        }
        res.send({todo})
    }).catch((e)=>{
        res.status(400).send()
    })
})




app.listen(3000, ()=>{
    console.log("Started on port 3000!")
})

module.exports={
    app
}




