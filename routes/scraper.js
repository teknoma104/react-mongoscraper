const express = require("express");
const router = express.Router();
const db = require("../models");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

//this renders the homepage
router.get("/", function (req, res) {

    db.Article.find({}, function (error, data) {
        var hbsObject = {
            article: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// A GET route for scraping the Monster Hunter reddit sub
router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("https://old.reddit.com/r/MonsterHunter/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        let previewArray = [];

        // Grabs the preview link
        $("a.thumbnail").each(function (i, element) {
            console.log("Thumbnail Scrape #" + i);
            // Save an empty result object
            var result = {};

            // Regular expression to test for preview links starting with /b
            const previewRegExp = /^\/\/b.*$/;

            result.preview = $(element).children("img").attr("src");

            // Test if result.preview exists
            // If it doesn't have a preview link, give it a default one
            // else it does exist and needs https: added to the url
            if (!result.preview) {
                result.preview = "/assets/img/palicon_icon.png"
            }
            else if (previewRegExp.test(result.preview)) {
                result.preview = "https:" + result.preview;
            }

            console.log("testing preview variable:    " + result.preview);

            previewArray.push(result.preview);

        });

        console.log("testing previewArray");
        console.log(previewArray);
        console.log("\n\n");

        // Grabs the title and related url link for each thread
        $("p.title").each(function (i, element) {
            console.log("======================================================================");
            console.log("Article Scrape #" + i);
            // Save an empty result object
            var result = {};

            // Regular Expression check
            const linkRegExp = /^\/r\/.*$/;

            // Save the text of the element in a "title" variable
            result.title = $(element).children("a").text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            result.link = $(element).children("a").attr("href");

            result.preview = previewArray[i];


            // Tests the result.link against a regular expression check to see 
            // if it begins with /r/ (indicating a direct reddit link)
            // if it is true, it concatenates result.link with "https://old.reddit.com" to make it a true hyperlink
            if (linkRegExp.test(result.link)) {
                result.link = "https://old.reddit.com" + result.link;
            }

            console.log("  testing title variable:    " + result.title);
            console.log("   testing link variable:    " + result.link);
            console.log("testing preview variable:    " + result.preview);

            console.log("======================================================================");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    });
});


// Route for getting all Articles from the db
router.get("/api/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route to delete all scraped articles from database
router.delete("/api/deleteall", function (req, res) {
    db.Article.remove({}, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(response);
        }
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/api/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// // Route to get all articles with saved flag boolean true
// router.get("/api/savedarticles123", function (req, res) {
//     console.log("attempting to get all saved threads with save=true");
//     db.Article.find({ "saved": true }).populate("notes")
//         .then(function (articles) {
//             console.log("testing saved threads");
//             console.log(articles);
//             var hbsObject = {
//                 article: articles
//             };
//             res.render("index", hbsObject);
//             // res.json(hbsObject);
//         });
// });

// Route to get all articles with saved flag boolean true
router.get("/api/savedarticles", function (req, res) {
    console.log("attempting to get all saved threads with save=true");
    db.Article.find({ "saved": true }).populate("notes")
        .then(function (dbArticle) {
            console.log(dbArticle);
            // If we were able to successfully find any saved Articles, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


// Route for updating article saved attribute
router.post("/api/articles/save/:id", function (req, res) {
    console.log(req.params.id);

    // Use the article id to find and update its saved boolean
    db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true })
        // Execute the above query
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route to remove a saved article by changing the saved flag to false
// also empties out all associated Notes/Comments 
router.post("/api/articles/remove/:id", function (req, res) {
    // Use the article id to find and update its saved boolean
    db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": false, "notes": [] })
        // Execute the above query
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


router.get("/api/user", function (req, res) {
    // res.send("Get Users")
});

router.post("/api/user", function (req, res) {
    db.User.create(req.body, function (error, response) {
        if (error) {
            return res.json(error);
        }
        return res.json(response);
    })
})

router.post("/login", function (req, res) {
    db.User.findOne({ username: req.body.username }, function (error, response) {
        if (error) {
            return res.json(error);
        }
        response.comparePassword(req.body.password, function (error, user) {
            if (error) {
                return res.json(error);
            }
            res.json(user);
        });
    })
})

router.put("/api/user/:id", function (req, res) {
    res.send("Update Users")
})

router.delete("/api/user/:id", function (req, res) {
    res.send("Delete Users")
})



module.exports = router;