const mong = require("./usermongo")
const hmong = require("./homemongo")
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

app.get("/updateUser/:id&:name&:age&:username", async (req, res)=>{
    await mong.userStuff.updateUser(req.params.id, req.params.name, req.params.age, req.params.username,)

    const user = await mong.userStuff.userByID(req.params.id)

    res.json(user)
})

app.get("/homes/:user", async (req, res)=>{
    const homes = await hmong.homeStuff.homesByID(req.params.user)
    
    console.log(homes)

    res.json(homes)
})

app.get("/makeUser/:name&:age&:username&:email", async (req, res)=>{
    console.log(req.params.name)
    console.log(req.params.age)
    console.log(req.params.username)
    console.log(req.params.email)

    
    mong.userStuff.createUser(req.params.name, req.params.age, req.params.username, req.params.email)
    console.log("did it?") 


});

app.get("/makeHome/:add&:city&:state&:zip&:price&:sqrft&:list&:user", async (req, res)=>{
    hmong.homeStuff.createHouse(req.params.add, req.params.city, req.params.state, req.params.zip, req.params.price, req.params.sqrft, req.params.list, req.params.user)
    console.log("doned it")
})

app.get("/updateHomelist/:id&:list", async (req, res)=>{
    await hmong.homeStuff.updateHome(req.params.id, req.params.list)

})

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