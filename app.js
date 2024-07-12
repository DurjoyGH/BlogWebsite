const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://durjoyghosh328:xWXlDi07bJ0iUGwB@cluster0.kxfmvif.mongodb.net/blogWebDB");

const homeStartingContent = "This is my personal blog site";
const aboutContent = "This project is developed by Durjoy from JUST CSE";
const contactContent = ["Email: durjoyghosh328@gmail.com", "Phone: 01859093806"];

const itemSchema = {

    title: String,
    content: String
}

const Item = mongoose.model("Item", itemSchema);

app.get("/", function (req, res) {

    Item.find({}).then(function(foundItems){

        res.render("home", {

            passage: homeStartingContent,
            posts: foundItems
    
        });

    }).catch(function(err){

        console.log(err);
    })

})

app.get("/about", function (req, res) {

    res.render("about", { aboutPassage: aboutContent });
})

app.get("/contact", function (req, res) {

    res.render("contact", { contactPassage: contactContent });
})

app.get("/compose", function (req, res) {

    res.render("compose");
})

app.get("/posts/:postId", function (req, res) {

    const requestedPostId = req.params.postId;

    Item.findOne({_id: requestedPostId}).then(function(post){

        res.render("post", {

            postTitle: post.title,
            postBody: post.content
        })

    }).catch(function(err){

        console.log(err);
    })
});


app.post("/compose", function (req, res) {

    const item = new Item({

        title: req.body.myTitle,
        content: req.body.myContent
    });

    Item.insertMany(item).then(function(){

        console.log("Added items!");

    }).catch(function(err){

        console.log(err);
    })

    res.redirect('/');
})


app.listen(3000, function () {

    console.log("Server running at port 3000....")
})