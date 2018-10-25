// Scrape button onclick button function
$("#scrape").on("click", function () {
    $("#info-text").text("Please wait while the we scrape the MH reddit sub.");
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function (data) {
        console.log(data)
        window.location = "/"
    });
});


// Delete all articles link button onclick link function
$("#deleteall").on("click", function () {
    $.ajax({
        method: "DELETE",
        url: "/deleteall",
    }).done(function (data) {
        window.location = "/"
    });
});

// Article Save button onclick button function
$(".save").on("click", function () {
    console.log("article save button clicked");
    var savedId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + savedId
    }).done(function (data) {
        window.location = "/"
    });
});

// Remove Saved Article onclick button function
$(".removeArticle").on("click", function () {
    var savedId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/remove/" + savedId
    }).done(function (data) {
        window.location = "/saved"
    });
});


// Save Comment onclick button function
$(".saveComment").on("click", function () {
    console.log("saveComment button clicked");

    var thisId = $(this).attr("data-id");
    console.log("thiID:  " + thisId);

    if (!$("#noteText" + thisId).val()) {
        alert("Blank comments are not allowed, please type in something")
    } else {
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: $("#noteText" + thisId).val()
            }
        }).done(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
    }
});

// Delete Comment onclick button function
$(".deleteComment").on("click", function () {
    console.log("delete comment button clicked");

    var noteID = $(this).attr("data-id");
    var articleID = $(this).attr("data-article-id");

    console.log("testing noteID:  " + noteID);
    console.log("testing articleID:  " + articleID);

    $.ajax({
        method: "DELETE",
        url: "/notes/delete/",
        data: { note_ID: noteID, article_ID: articleID }
    }).done(function (data) {
        console.log(data)
        $(".modalNote").modal("hide");
        window.location = "/saved"
    });
});