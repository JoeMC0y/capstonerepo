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

app.get("/homes/:user", async (req, res)=>{
    const homes = await hmong.homeStuff.homesByID(req.params.user)
    
    console.log(homes)

    res.json(homes)
})

app.get("/getReqs/:home", async (req, res)=>{
    const reqs = await hmong.homeStuff.reqsByID(req.params.home)
    console.log(req.params.home)
    console.log(reqs)

    res.json(reqs)
})

app.get("/getBuyers/:home", async (req, res)=>{
    const reqs = await hmong.homeStuff.buyersByID(req.params.home)
    console.log(req.params.home)
    console.log(reqs)

    res.json(reqs)
})

app.get("/updateUser/:id&:name&:age&:username", async (req, res)=>{
    await mong.userStuff.updateUser(req.params.id, req.params.name, req.params.age, req.params.username,)

    const user = await mong.userStuff.userByID(req.params.id)

    res.json(user)
})



app.get("/makeUser/:name&:age&:username&:email&:acc", async (req, res)=>{
    console.log(req.params.name)
    console.log(req.params.age)
    console.log(req.params.username)
    console.log(req.params.email)

    
    mong.userStuff.createUser(req.params.name, req.params.age, req.params.username, req.params.email, req.params.acc)
    console.log("User made") 


});

app.get("/makeHome/:name&:add&:city&:state&:zip&:price&:sqrft&:list&:user", async (req, res)=>{
    hmong.homeStuff.createHouse(req.params.name, req.params.add, req.params.city, req.params.state, req.params.zip, req.params.price, req.params.sqrft, req.params.list, req.params.user)
    console.log("House made")
    
})

app.get("/updateHomelist/:id&:list", async (req, res)=>{
    await hmong.homeStuff.updateHome(req.params.id, req.params.list)

})


app.get("/makeReq/:todo&:done&:id", async (req, res) => {
    await hmong.homeStuff.addReqs(req.params.todo, req.params.done, req.params.id)
    const reqs = await hmong.homeStuff.reqsByID(req.params.id)
    console.log("reqs made")
    res.json(reqs)
}) 

app.get("/makeBuyer/:name&:contact&:id", async (req, res) => {
    await hmong.homeStuff.addBuyer(req.params.name, req.params.contact, req.params.id)
    const buyers = await hmong.homeStuff.buyersByID(req.params.id)
    console.log("buyer made")
    res.json(buyers)
}) 

app.get("/deleteReq/:id&:hid", async (req, res) => {
    await hmong.homeStuff.deleteReqs(req.params.id)

    const reqs = await hmong.homeStuff.reqsByID(req.params.hid)

    res.json(reqs)
})

app.get("/deleteBuyer/:id&:hid", async (req, res) => {
    await hmong.homeStuff.deletebuyer(req.params.id)

    const reqs = await hmong.homeStuff.buyersByID(req.params.hid)

    res.json(reqs)
    console.log("deleted user")
})

app.get("/updateReqs/:id&:done&:hid", async (req, res) => {
    console.log(req.params.id)
    console.log(req.params.done)
    console.log("updated")
    await hmong.homeStuff.updateReq(req.params.id, req.params.done)

    const reqs = await hmong.homeStuff.reqsByID(req.params.hid)

    res.json(reqs)
})

// app.get("/updateReq/:todo&:id", async (req, res) => {
//     hmong.homeStuff.
// })

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