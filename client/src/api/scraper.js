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
        return axios.get("/api/articles/saved")
    },

    // Deletes everything in the collection
    deleteEverything: function () {
        return axios.get("/api/deleteall");
    }
}

export default API