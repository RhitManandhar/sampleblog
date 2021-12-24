const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes")
//express app
const app = express()

//connect to database
const dbURI =
  "mongodb+srv://root:root@cluster0.iercm.mongodb.net/node?retryWrites=true&w=majority"
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connectd to db"))
  .catch((err) => console.log(err))
//register view engine
app.set("view engine", "ejs")

//listening for request
app.listen(3000)

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

//blog routes
app.use("/blogs", blogRoutes)

app.use((req, res) => {
  res.status(404).render("404", { title: "404" })
})
