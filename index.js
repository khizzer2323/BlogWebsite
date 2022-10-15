// requiring modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeStartingContent = "Lorem ipsum rtor posuere ac ut consequat. Et pharetra pharetra massa massa. Justo laoreet sit amet cursus sit. Sociis natoque penatibus et magnis. Sem et tortor consequat id porta nibh venenatis cras sed. Volutpat odio facilisis mauris sit amet massa vitae tortor.dolor sit amet consectetur adipiscing elit augue lacus facilisi, class dapibus nascetur condimentum risus cum parturient feugiat lobortis natoque, suspendisse elementum taciti inceptos luctus neque metus morbi conubia. Vitae sagittis magnis lobortis platea mus urna quisque suspendisse aptent non hendrerit fames, dapibus dui semper sociosqu sit fringilla nulla ut donec proin elementum.";
const about = "Lorem ipsum dolor sit amet consectetur adipiscing elit augue lacus facilisi, class dapibus nascetur condimentum risus cum parturient feugiat lobortis natoque, suspendisse elementum taciti inceptos luctus neque metus morbi conubia. Vitae sagittis magnis lobortis platea mus urna quisque suspendisse aptent non hendrerit fames, dapibus dui semper sociosqu sit fringilla nulla ut donec proin elementum.";
const contact = "Lorem ipsum dolor Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Auctor eu augue ut lectus. Morbi tincidunt augue interdum velit. Duis at tellus at urna condimentum mattis pellentesque. Eget gravida cum sociis natoque penatibus et.Habitant morbi tristique senectus et netus et. Tortor aliquam nulla facilisi cras fermentum. Id neque aliquam vestibulum morbi blandit cursus risus at. A erat nam at lectus urna duis. Sed risus ultricies tristique nulla aliquet enim. Eleifend mi in nulla posuere sollicitudin aliquam. Malesuada fames ac turpis egestas sed tempus urna. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Et pharetra pharetra massa massa. Justo laoreet sit amet cursus sit. Sociis natoque penatibus et magnis. Sem et tortor consequat id porta nibh venenatis cras sed. Volutpat odio facilisis mauris sit amet massa vitae tortor.";

// creating two arrays One will store titles of the blogs and other will store their body.
let postTitles = [];
let postBodies = [];



// Start of get requests
app.get("/", (req, res) => {

    res.render("home", { homeContent: homeStartingContent, postTitle: postTitles, postBody: postBodies });
});

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: about });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contact })
});

app.get("/compose", (req, res) => {
    res.render("compose");
})
app.post("/compose", (req, res) => {

    let title = req.body.postTitle;
    let body = req.body.postBody;

    postTitles.push(title);
    postBodies.push(body);
    res.redirect("/");
})
//  Here /posts is the path. /:name is the name of the parameter which will be written here and this will log the value that user entered in /:name
app.get("/posts/:name", (req, res) => {
    // here param will give us the value of the name parameter written in above ^
    let param = req.params.name;
    // we converted the param to lower case or KebabCase i.e day-2
    let requiredParam = _.lowerCase(param);
    // we converted the array postTitles to lowercase as well and stored it in another var 
    let storedTitles = _.lowerCase(postTitles);
    //    Comparing both values
    if (requiredParam == storedTitles) {
        // declaring a object which will sote title and body of the blog
        let equal = {};
        // looping to get the same content and title
        for (i = 0; i < postTitles.length; i++) {
            let titleLoop = _.lowerCase(postTitles[i]);
            let bodyLoop = postBodies[i];
            //  storing their values in object
            equal = {
                title: titleLoop,
                body: bodyLoop
            };
            //  If the postTitle is found in the array this will break the loop and move to the next step which is to render title and body
            if (titleLoop == requiredParam) { break; }
        }
        // sending response to the user .F
        res.render("post", { title: equal.title, body: equal.body });

        // just checking if it worked.
        console.log("loading");

    }

});




// Ignore everything below this line.
app.listen(3000, () => {

    console.log("listening at port 3000");

})
