import React, { Component } from 'react';


export default class Kotak extends Component {
    // state seperti variable tetapi jika dirubah denngan
    // setstate akan membuat komponene merender ulang tampilannya
    state = {
      angka: 3,
    };
    
    // componentDidMount(){ isi kodingnya biasanya buat ngambil data dari backend

    // }

    // componentDidUpdate(){
        // ketrigger pada saat setstate, newprops, forceupdate 
    // }

    // componentWillUnmount(){
        // ketrigger pada saat mau pindah komponent atau page

    // }

    onTambahClick = (angkaTambah) => {
      let angka1 = this.state.angka + angkaTambah;
      this.setState({ angka: angka1 });
    };
  
    render() {
    
      return (
        <div style={{ backgroundColor: "burlywood" }}>
          <h1>ini hahaha {this.state.angka}</h1>
          <button onClick={() =>this.onTambahClick(2)}>+ </button>
        </div>
      );
    }
}

