const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error", "Doesn't exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// create route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    if (listingData.image && typeof listingData.image === "string") {
      listingData.image = { filename: "external", url: listingData.image };
    }
    const newListing = new Listing(listingData);
    await newListing.save();
    req.flash("success", "New listing created")
    res.redirect("/listings");
  })
);

// edit route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Doesn't exist");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// update route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listingData = req.body.listing;
    if (listingData.image && typeof listingData.image === "string") {
      listingData.image = { filename: "external", url: listingData.image };
    }
    await Listing.findByIdAndUpdate(id, { ...listingData });
    req.flash("success", "updated");
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
  })
);

module.exports = router;
