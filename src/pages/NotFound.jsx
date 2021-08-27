import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {};
  render() {
    console.log(this.props.location);
    return (
      <div>
        <h1>NotFound</h1>
        <Link to="/">to Home</Link>
      </div>
    );
  }
}

export default NotFound