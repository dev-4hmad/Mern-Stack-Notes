const express = require("express");
const app = express();
const port = 8080; 
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override")
// -------------------------------------------------
// for the understanding of express-----------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// -------------------------------------------------

// paths -----------------------------------------------
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// -----------------------------------------------------


// posts in an array -----------------------------------
let posts = [
  {
    id: uuidv4(),
    username: "Defaul post",
    content: "This is a defaul post and will always be desplayed on the webpage.",
  },
];


app.get("/",(req,res)=>{
  res.send("root working")
})
// Render the first page or index.ejs ----------------
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// send post request 
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});


// show content based on id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// update existing post
app.patch("/posts/:id", (req, res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})

// get the updated content
app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})
})

// delete post based on id
app.delete("/posts/:id", (req, res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

// port------------------------------------
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
