const mong = require("./usermongo")
const houseMaker = require("./HouseMaker")
const cors = require('cors');

const express = require('express');

const app = express()
const port = 4200;

app.use(cors());
app.use(express.static("images"))
app.get("/", async (req, res) => {
    console.log("imma die")
})

app.get("/getAll", async (req, res)=>{

    const users = await mong.userStuff.getAll()
    
    console.log(users)

    res.json(users)
    
})

app.get("/makeUser/:name&:age&:username&:email", async (req, res)=>{
    console.log(req.params.name)
    console.log(req.params.age)
    console.log(req.params.username)
    console.log(req.params.email)

    
    mong.userStuff.createUser(req.params.name, req.params.age, req.params.username, req.params.email)
    console.log("did it?") 


});

app.get("/getRand/:count", (req, res) => {

    if(req.params.count >= 50){
        var result = []
        res.json(result);
    }else{
        var houses = houseMaker.generator.getMultHouse(req.params.count)
        const result = getResults(houses);
        res.json(result)
    }
    
});

function getResults(homes){
    if(homes && homes.length > 0){
        return {
            results: homes
        };
    }else{
        return {
            results: [],
            error: "OOF"
        }
    }
}


app.listen(port);