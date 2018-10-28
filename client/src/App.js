import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import "./App.css";

const App = () => (
    <Router>
        <div>
            <Header>
                <Nav />
            </Header>
            <Jumbotron
                className="text-center"
            >
                <img src="/assets/img/monster_hunter_logo.png" className="rounded mx-auto d-block" width="900px" />
                <h3>Welcome to the Monster Hunter Reddit Scraper!</h3>
                <span id="info-text"></span>
                <hr />
            </Jumbotron>
            <Switch>
                <Route exact path="/" component={Books} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/books/:id" component={Detail} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>
);

export default App;
