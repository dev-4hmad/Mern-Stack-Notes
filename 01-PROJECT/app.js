const express = require("express");
const app = express();
const Listing = require("./models/listing");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// parsing url
app.use(express.urlencoded({ extended: true }));

// ejs mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

// using CSS file
app.use(express.static(path.join(__dirname, "public")));

// method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("Database connceted ✌");
  })
  .catch((err) => {
    console.error("❌ connection failed:");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Root is working 😀");
});

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);

// create route
app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(404, "Error from /listing, SEND VALID DATA");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// edit route

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// update route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(404, "Error from /listing/:id, SEND VALID DATA");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listen });
    res.redirect(`/listings/${id}`);
  })
);

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong (default error)" } =
    err;
  res.status(statusCode).send(message);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
