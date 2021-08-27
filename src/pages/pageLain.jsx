import React, { Component } from "react";
import {SubPages,Alert} from './../components'
import { Switch, Route, Link } from "react-router-dom";

class PageLain extends Component {
    state = {};
    render() {
      return (
        <div>
          <h1>tes satu</h1>
          <Link to="/">to Home</Link>
          <div className="row mt-2 mx-0">
            <div className="col-md-2 ">
              <div>
                <Link to="/page">
                  <button>alert </button>
                </Link>
              </div>
              <div>
                <Link to="/page/modal">
                  <button>modal </button>
                </Link>
              </div>
              <div>
                <Link to="/page/breadCrumbs">
                  <button>breadCrumbs </button>
                </Link>
              </div>
            </div>
            <div className="col-md-9">
              {/* nesting Routing Navigation */}
              <Switch>
                <Route path="/page" exact component={Alert} />
                <Route path="/page/:subPages" component={SubPages} />
              </Switch>
            </div>
          </div>
        </div>
      );
    }
}

export default PageLain