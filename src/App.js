import React, { Component } from "react";
import Kotak from "./kotak";
import Kotak1 from "./kotak1";

class App extends Component {
  state = {
    data: [1, 2, 3, 4],
    // data: 3,
  };

  // componnetwillmount > render > componentdidmount  (mounting)
  // trigger didalam fase updating : setState , newProps,forceUpdate()
  // componentWillUpdate > render > componentdidUpdate (updating)

  renderKotak = this.state.data.map((val) => {
    if (val % 2 === 1) {
      return <Kotak1 />;
    } else {
      return <Kotak />;
    }
  });

  //   renderKotak = [
  //     <div>
  //       <h1>kotak aja</h1>
  //     </div>,
  //     <Kotak />,
  //     <Kotak1 />,
  //     <Kotak />,
  //   ];

  //   renderKotak = () => {
  //     return this.state.data.map((val) => {
  //       if (val % 2 == 1) {
  //         return <Kotak1 />;
  //       } else {
  //         return <Kotak />;
  //       }
  //     });
  //   };

  render() {
    return <div>{this.renderKotak}</div>;
  }
}

export default App;
