const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
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

app.get("/", (req, res) => {
  res.send("Root is working 😀");
});

// session
const sessionOptions = {
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()  + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
// flash
app.use(flash()); 

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

const mongoose = require("mongoose");
const review = require("./models/review.js");
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

// router/listing.js
app.use("/listings", listingRouter);
// router/review.js
app.use("/listings/:id/reviews", reviewsRouter);
// router/user.js
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong (default error)" } =
    err;
  res.status(statusCode).render("error.ejs", { err });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
