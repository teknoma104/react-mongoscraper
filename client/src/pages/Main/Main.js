import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import ScrapeCard from "../../components/ScrapeCard";
import {CardList} from "../../components/CardList";
import API from "../../api/scraper.js";

class Main extends Component {

    state = {
        articles: []
    };

    componentDidMount() {
        console.log("main page didmount, calling getAllArticles()");
        this.getAllArticles();
    }

    getAllArticles = () => {
        API.getAllThreads()
            .then(response =>
                this.setState({ articles: response.data })
            )
            .catch(err => console.log(err));
    }

    saveThisArticle = (id) => {
        console.log("Save button clicked");
        console.log("testing id:  " + id);
        API.saveThisThread(id)
        .then(function (data) {
            console.log(data);
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        {this.state.articles.length ? (
                            <CardList>
                                {
                                    this.state.articles.map(article => (
                                        <ScrapeCard
                                            key={article._id}
                                            _id={article._id}
                                            title={article.title}
                                            link={article.link}
                                            preview={article.preview}
                                            saveThisArticle={this.saveThisArticle}
                                        />
                                    ))}
                            </CardList>
                        ) : (
                                <div className="card">
                                    <div className="card-body">
                                        <h5>No scraped Monster Hunter Reddit threads found! Click the "Scrape MH Reddit" link at the top to populate some Reddit thread links here.</h5>
                                    </div>
                                </div>
                            )}

                    </Col>
                </Row>
            </Container>

        );
    }
}

export default Main;