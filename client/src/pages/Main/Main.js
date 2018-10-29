import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Card from "../../components/Card";
import {CardList} from "../../components/CardList";
import API from "../../api/scraper.js";

class Main extends Component {

    state = {
        articles: [],
        savedArticles: []
    };

    componentDidMount() {
        this.getAllArticles();
    }

    getAllArticles = () => {
        API.getAllThreads()
            .then(response =>
                this.setState({ articles: response.data })
            )
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
                                        <Card
                                            key={article._id}
                                            _id={article._id}
                                            title={article.title}
                                            link={article.link}
                                            preview={article.preview}
                                        />
                                    ))}
                            </CardList>
                        ) : (
                                <div class="card">
                                    <div class="card-body">
                                        <h5>No scraped Monster Hunter reddit threads found! Click the "Scrape MH Reddit" link to populate some reddit thread links here.</h5>
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