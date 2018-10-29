import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import { Col, Row, Container } from "./components/Grid";
import "./App.css";

const App = () => (
    <Router>
        <div>
            <Header>
                <Nav />
            </Header>
            <Container>
                {/* <div> */}
                    <Jumbotron
                        className="text-center"
                    >
                        <img src="/assets/img/monster_hunter_logo.png" className="rounded mx-auto d-block" width="900px" alt="" />
                        <h3>Welcome to the Monster Hunter Reddit Scraper!</h3>
                        <span id="info-text"></span>
                        <hr />
                    </Jumbotron>
                    <Row>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route component={NoMatch} />
                        </Switch>
                    </Row>
                {/* </div> */}
            </Container>
        </div>
    </Router>
);

export default App;
