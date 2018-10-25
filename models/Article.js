var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },
    // `preview` is not required and of type String (this is for the picture preview url)
    preview: {
        type: String
    },
    // `saved` is not required and of type Boolean (this is to save scraped reddit threads)
    saved: {
        type: Boolean,
        default: false
    },
    // `note` is an array of note objects that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with the associated Notes
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
