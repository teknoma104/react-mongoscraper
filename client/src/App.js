import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import SavedThreads from "./pages/SavedThreads";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import { Row, Container } from "./components/Grid";
import API from "./api/scraper";
import "./App.css";



class App extends Component {
    state = {
        infoText: ""
    };

    deleteAllArticles = () => {
        API.deleteEverything()
            .then(function (data) {
                console.log(data)
                window.location = "/"
            })
            .catch(err => console.log(err));
    }


    scrapeMHSubReddit = () => {
        this.setState({ infoText: "Please wait while the we scrape the MH reddit sub." });

        API.scrape()
            .then(function (data) {
                console.log(data)
                window.location = "/"
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div>
                    <Header>
                        <Nav
                            scrapeMHSubReddit={this.scrapeMHSubReddit}
                            deleteAllArticles={this.deleteAllArticles}
                        />
                    </Header>
                    <Container>
                        {/* <div> */}
                        <Jumbotron
                            className="text-center"
                        >
                            <img src="/assets/img/monster_hunter_logo.png" className="rounded mx-auto d-block" width="900px" alt="" />
                            <h3>Welcome to the Monster Hunter Reddit Scraper!</h3>
                            <span id="info-text">{this.state.infoText}</span>
                            <hr />
                        </Jumbotron>
                        <Row>
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route exact path="/saved" component={SavedThreads} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Row>
                        {/* </div> */}
                    </Container>
                </div>
            </Router>
        );
    }
}
export default App;
