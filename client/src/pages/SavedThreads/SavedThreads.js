import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Modal from "../../components/Modal";

const SavedThreads = () => (
    <Container fluid>
        <Container fluid>
            <Row>
                <Col size="md-12" className="text-center">
                    <h1>Your Saved Threads</h1>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                    {this.state.articles.length ? (
                        <CardList>

                            {this.state.articles.map(article => (
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
                            <h3>No Results to Display</h3>
                        )}

                </Col>
            </Row>
        </Container>
    <Modal></Modal>
    </Container>
);

export default SavedThreads;