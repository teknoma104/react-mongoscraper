import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import SavedCard from "../../components/SavedCard";
import { CardList } from "../../components/CardList";
import API from "../../api/scraper.js";
import Modal from "../../components/Modal";

class SavedThreads extends Component {

    state = {
        savedArticles: [],
        userComment: ""

    };

    componentDidMount() {
        console.log("saved thread page didmount, calling getSavedArticles()");
        this.getSavedArticles();
    }

    getSavedArticles = () => {
        console.log("getSavedArticle function called");
        API.getSavedThreads()
            .then(response =>
                this.setState({ savedArticles: response.data })
            )
            .catch(err => console.log(err));
    }

    removeTargetSavedArticle = (id) => {
        console.log("Save button clicked");
        console.log("testing id:  " + id);
        API.removeThisSavedThread(id)
            .then(function (data) {
                console.log(data);
                window.location = "/saved"
            })
            .catch(err => console.log(err));
    }

    saveCommentButton = (id) => {
        console.log("save comment button clicked");
        console.log("ID returned:  " + id);
        console.log("testing state body");
        console.log(this.state.userComment);

        let userComment = this.state.userComment;

        if (!userComment) {
            alert("Blank comments are not allowed, please type in something");
        } else {
            API.saveNewNote(id, userComment)
                .then(function (data) {
                    console.log(data);
                    window.location = "/saved"
                })
                .catch(err => console.log(err));
        }
    }

    deleteCommentButton = (articleID, noteID) => {
        console.log("delete comment button clicked");
        console.log("Article ID returned:  " + articleID);
        console.log("Note ID returned:  " + noteID);

        API.deleteNote(articleID, noteID)
        .then(function (data) {
            console.log(data);
            window.location = "/saved"
        })
        .catch(err => console.log(err));
    }

    handleChange = event => {
        // console.log("change detected");
        // console.log(event.target.value);
        this.setState({ userComment: event.target.value });
    }



    render() {
        return (
            <Container fluid>
                <Container fluid>
                    <Row>
                        <Col size="md-12" className="text-center">
                            <h1>Your Saved Threads</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-12">
                            {this.state.savedArticles.length ? (
                                <CardList>
                                    {
                                        this.state.savedArticles.map(article => (
                                            <SavedCard
                                                key={article._id}
                                                _id={article._id}
                                                title={article.title}
                                                link={article.link}
                                                preview={article.preview}
                                                removeThisSavedThread={this.removeTargetSavedArticle}
                                            />
                                        ))}
                                </CardList>
                            ) : (
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>No saved Monster Hunter reddit threads found! Go back to the home page and save some Reddit threads with the Save Button.</h5>
                                        </div>
                                    </div>
                                )}

                        </Col>
                    </Row>
                </Container>
                {
                    this.state.savedArticles.map(article => (
                        <Modal
                            key={article._id}
                            _id={article._id}
                            title={article.title}
                            link={article.link}
                            preview={article.preview}
                            notes={article.notes}
                            saveCommentButton={this.saveCommentButton}
                            deleteCommentButton={this.deleteCommentButton}
                            handleChange={this.handleChange}
                        />
                    ))
                }
            </Container>
        )
    };
}

export default SavedThreads;