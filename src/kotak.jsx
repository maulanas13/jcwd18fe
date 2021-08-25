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
    

    onGetDataClick = ()=>{
        if(this.props.getDataFromChild){
            this.props.getDataFromChild(this.state.angka)
        }else{
            alert('no function')
        }
    }

    render() {

        return (
            <>
                <div style={{ backgroundColor: this.props.warna ||  "burlywood" }}>
                    <h1>ini kotak ke-{this.props.bebas}</h1>
                    <button onClick={this.onGetDataClick}>
                        kriim data to parent
                    </button>
                </div>
                {this.props.children}
            </>
        );
    }
}

