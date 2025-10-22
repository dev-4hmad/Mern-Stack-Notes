const express = require("express");
const app = express();
const Listing = require("./models/listing")
const path = require("path")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
// parsing url
app.use(express.urlencoded({extended: true}))

const methodOverride = require("method-override")
app.use(methodOverride("_method"))

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("Database connceted ✌")
}).catch((err)=>{
    console.error("❌ connection failed:")
    console.error(err)
})



app.get("/", (req, res)=>{
    res.send("Root is working 😀")
})

app.get('/listings', async (req, res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", { allListings })
})


app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs")
})


app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id) 
    res.render("listings/show.ejs", { listing })
})

// create route
app.post("/listings", async (req, res)=>{
    
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings")

})

// edit route

app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id) 
    res.render("listings/edit.ejs", {listing})
})


// update route 
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listen})
    res.redirect(`/listings/${id}`)
})

app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})




// app.get("/testListing", async (req, res)=>{
//     let sample = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Lahore",
//         country: "Pakistan",
//     })
//     await sample.save();
//     console.log("Sample was saved");
//     res.send("sample saved")
// })


const PORT = 8080;
app.listen(PORT, ()=>{ 
    console.log(`listening at port ${PORT}`);
}) 
