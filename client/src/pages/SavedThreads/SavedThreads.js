import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import SavedCard from "../../components/SavedCard";
import {CardList} from "../../components/CardList";
import API from "../../api/scraper.js";
// import Modal from "../../components/Modal";

class SavedThreads extends Component {

    state = {
        savedArticles: []
    };

    componentDidMount() {
        this.getSavedArticles();
    }

    getSavedArticles = () => {
        API.getSavedThreads()
            .then(function (response) {
                console.log("Getting articles with saved = true");
                console.log(response);
                this.setState({ savedArticles: response.data })
            }
            )
            .catch(err => console.log(err));
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
                {/* <Modal></Modal> */}
            </Container>
        )
    };
}

export default SavedThreads;