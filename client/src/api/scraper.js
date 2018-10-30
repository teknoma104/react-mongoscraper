import axios from "axios";

const API = {

    // Scrapes the old version of MH subreddit for threads
    scrape: function () {
        return axios.get("/scrape");
    },

    // Gets all threads that are stored in the collection
    getAllThreads: function () {
        return axios.get("/api/articles/");
    },

    getSavedThreads: function () {
        console.log("getSavedThreads route called");
        return axios.get("/api/savedarticles/");
    },

    // Deletes everything in the collection
    deleteEverything: function () {
        return axios.delete("/api/deleteall");
    },

    saveThisThread: function (id) {
        return axios.post("/api/articles/save/" + id);
    },

    removeThisSavedThread: function (id) {
        return axios.post("/api/articles/remove/" + id);
    },
    saveNewNote: function (id, userComment) {
        return axios.post("/api/articles/" + id, { body: userComment });
    },
    deleteNote: function(articleID, noteID) {
        console.log("testing articleID:  " + articleID);
        console.log("testing noteID:  " + noteID);
        return axios.post("/api/notes/delete/", { note_ID: noteID, article_ID: articleID });
    }
}

export default API