import React, { Component } from "react";
import { Header } from "./components";
import Home from "./pages/Home";
import PageLain from "./pages/pageLain";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        {/*  Routing Navigation */}

        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/page" component={PageLain} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
