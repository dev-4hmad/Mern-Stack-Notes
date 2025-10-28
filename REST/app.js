const express = require("express");
const app = express();
const ExpressError = require("./ExpressError")


app.use("/api", (req, res, next)=>{
    let {token} = req.query;
    if (token === "giveaccess"){
        next();
    }
    res.send("Sorry bhaiya, ye harkat nahi chaly gi")
})




app.get("/api", (req, res)=>{
    res.send("very special data")
})

app.get("/admin", (req, res)=>{
    throw new ExpressError(401, "Access not available")
})




app.get("/", (req, res)=>{
    res.send("ROOT")
})













const PORT = 3000;
app.listen(PORT, ()=>{ 
    console.log(`listening at port ${PORT}`);
}) 
