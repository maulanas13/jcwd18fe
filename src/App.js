import React, { Component } from "react";
import Kotak from "./kotak";
import Kotak1 from "./kotak1";
//? cara mengirim data dari parent componet ke child komponen ke child
//? berbagi data dari child ke parent membututhkan sebuah function dari parent
class App extends Component {
  state = {
    data: [1, 2, 3, 4],
    // data: 3,
    angka: 2,
  };

  // componnetwillmount > render > componentdidmount  (mounting)
  // trigger didalam fase updating : setState , newProps,forceUpdate() (updating)
  // componentWillUpdate > render > componentdidUpdate (updating)

  renderKotak = this.state.data.map((val) => {
    if (val % 2 === 1) {
      return <Kotak1 bebas={val} />;
    } else {
      return <Kotak bebas={val} />;
    }
  });

  getDataFromChild = (dataFromChild) => {
    alert(dataFromChild);
    this.setState({ angka: dataFromChild });
  };

  //   renderKotak = [
  //     <Kotak1 bebas={1} />,
  //     <Kotak  bebas={2}/>,
  //     <Kotak1 bebas={3}/>,
  //     <Kotak  bebas={4}/>,
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
    return (
      <div>
        <h1>{this.state.angka}</h1>
        <Kotak
          warna="steelblue"
          bebas={2}
          getDataFromChild={this.getDataFromChild}
        >
          <div>
            <h1>ini children</h1>
          </div>
        </Kotak>
        <Kotak1 bebas={44} />
        <Kotak bebas={11} />
      </div>
    );
  }
}

export default App;
