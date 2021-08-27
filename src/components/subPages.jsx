import React, { Component } from "react";


class SubPages extends Component {
    state = {};
  
    render() {
      console.log(this.props.match.params);
      return (
        <div className="bg-light">
          <h1>INI {this.props.match.params.subPages}</h1>
        </div>
      );
    }
  }

export default SubPages