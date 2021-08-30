import React, { Component } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import TableRow from "./../components/TableRow";
import './styles/home.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Home extends Component {
  state = {
    todo: [],
    modalOpen: false,
    modalDel: false,
    indexDel: -1,
    dataAdd: {
      tanggal: "",
      jam: "",
      kegiatan: "",
      tempat: "",
      gambar: "",
      waktuKegiatan: "0",
    },
    modalEdit: false,
    indexEdit: -1,
    dataEdit: {
      tanggal: "",
      jam: "",
      kegiatan: "",
      tempat: "",
      gambar: "",
      waktuKegiatan: "0",
    },
    loading:true
  };
  
  // ? list lifecycle method
  //! componnetwillmount > render > componentdidmount  (mounting)
  // trigger didalam fase updating : setState , newProps,forceUpdate() (updating)
  //! componentWillUpdate > render > componentdidUpdate (updating)
  //! componentWillUnMount (unmount)

  componentDidMount(){
    axios.get(`http://localhost:5000/todos`)
    .then((res)=>{
      // console.log(res.data)
      this.setState({todo:res.data})
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      this.setState({loading:false})
    })
  }


  // ! add todo handler started
  toggleModalHandler = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleModalDelHandler = () => {
    this.setState({ modalDel: !this.state.modalDel });
  };

  toggleModalEditHandler = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  //? cara get input user tapi kurang dinamis
  // onKegiatanInput = (e) => {
  //   let dataAddMute = this.state.dataAdd; //data dimutation agar tidak mengubah state langsung
  //   dataAddMute = { ...dataAddMute, kegiatan: e.target.value };
  //   this.setState({ dataAdd: dataAddMute });
  // };

  // onDateInput = (e) => {
  //   let dataAddMute = this.state.dataAdd;
  //   dataAddMute = { ...dataAddMute, tanggal: e.target.value };
  //   this.setState({ dataAdd: dataAddMute });
  // };
  //? cara get input user dinamis
  onAddInputHandler = (e) => {
    let dataAddMute = this.state.dataAdd;
    dataAddMute = { ...dataAddMute, [e.target.name]: e.target.value };
    this.setState({ dataAdd: dataAddMute });
  };

  onEditInputHandler = (e) => {
    let dataEditMutate = this.state.dataEdit;
    dataEditMutate = { ...dataEditMutate, [e.target.name]: e.target.value };
    this.setState({ dataEdit: dataEditMutate });
  };

  onAddTodoClick = () => {
    console.log(this.state.dataAdd);
    let { kegiatan, tempat, tanggal, waktuKegiatan, gambar, jam } =
      this.state.dataAdd;

    // validasi data untuk memeriksa tidak ada yang boleh ksoosng
    if (!kegiatan || !tempat || !tanggal || !waktuKegiatan || !gambar || !jam) {
      alert("tolong isi semua");
      return; // return ditulis jika tidak mau lagi melanjutkan code dibawah
      // bisa digantikan juga dengan else
    }

    // this.state.dataAdd harus object
    axios.post(`http://localhost:5000/todos`,this.state.dataAdd)
    .then((res)=>{
      console.log(res.data)
      // refresh data with method get
      axios.get(`http://localhost:5000/todos`)
      .then((res1)=>{
        let defaultAddData = {
          tanggal: "",
          jam: "",
          kegiatan: "",
          tempat: "",
          gambar: "",
          waktuKegiatan: "0",
        };
        this.setState({todo:res1.data,  dataAdd: defaultAddData, modalOpen: false });
      }).catch((err)=>{
        console.log(err)
        alert('server error')
      })
    }).catch((err)=>{
      console.log(err)
      alert('server error')
    })
 

  };

  // ! add todo handler finish
  
  // ! delete todo Handler
  onDeleteClick = (index) => {
    this.setState({ indexDel: index, modalDel: !this.state.modalDel });
  };

  onConfirmDeleteClick = () => {
    let { todo, indexDel } = this.state;
    let idDelete = todo[indexDel].id
    
    axios.delete(`http://localhost:5000/todos/${idDelete}`)
    .then((res)=>{
      console.log(res.data) // hasil pasti object kosong = {}
      // refresh data with method get
      axios.get(`http://localhost:5000/todos`)
      .then((res1)=>{
        this.setState({
          todo:res1.data,  
          indexDel: -1,
          modalDel: !this.state.modalDel, 
        });
      }).catch((err)=>{
        console.log(err)
        alert('server error')
      })
    }).catch((err)=>{
      console.log(err)
      alert('server error')
    })



  };

  // ! delete todo handler finish

  // ! Edit Todo Handler
  onEditClick = (index) => {
    let newDataEdit = this.state.todo[index];

    this.setState({
      indexEdit: index,
      modalEdit: !this.state.modalEdit,
      dataEdit: newDataEdit,
    });
  };

  onSaveEditClick = () => {
    let { kegiatan, tempat, tanggal, waktuKegiatan, gambar, jam } =
      this.state.dataEdit;

    // validasi data untuk memeriksa tidak ada yang boleh ksoosng
    if (!kegiatan || !tempat || !tanggal || !waktuKegiatan || !gambar || !jam) {
      alert("tolong isi semua");
      return; // return ditulis jika tidak mau lagi melanjutkan code dibawah
      // bisa digantikan juga dengan else
    }
    let { indexEdit, todo, dataEdit } = this.state;
  
    let idEdit = todo[indexEdit].id
  
    //? karena data editnya property dibawa semua jadi boleh pake patch atau put untuk update data
    axios.put(`http://localhost:5000/todos/${idEdit}`,dataEdit)
    .then((res)=>{
      console.log(res.data)
      // refresh data with method get
      axios.get(`http://localhost:5000/todos`)
      .then((res1)=>{
        let defaultEditData = {
          tanggal: "",
          jam: "",
          kegiatan: "",
          tempat: "",
          gambar: "",
          waktuKegiatan: "0",
        };
        alert('berhasil ubah data')
        this.setState({
          todo: res1.data,
          dataEdit: defaultEditData,
          modalEdit: false,
        });
        
      }).catch((err)=>{
        console.log(err)
        alert('server error')
      })
    }).catch((err)=>{
      console.log(err)
      alert('server error')
    })
    
    
  };
  // !Edit Todo HAndler Finish

  renderKegiatan = () => {
    return this.state.todo.map((val, index) => {
      return (
        // ? dengan komponen
        <TableRow
          key={index}
          val={val}
          index={index}
          onDeleteClick={this.onDeleteClick}
          onEditClick={this.onEditClick}
        />
        // ?  tanpa komponen
        // <tr key={index}>
        //   <td>{index + 1}</td>
        //   <td>{this.renderTanggalProper(val.tanggal)}</td>
        //   <td style={{ width: "10%" }}>{val.jam}</td>
        //   <td>{val.kegiatan}</td>
        //   <td style={{ width: "30%" }}>
        //     <img alt={"gambar"} src={val.gambar} height={200} />
        //   </td>
        //   <td style={{ width: "10%" }}>{val.waktuKegiatan} jam</td>
        //   <td>{val.tempat}</td>
        //   <td>
        //     <button className="btn btn-primary mr-3">
        //       <AiOutlineEdit /> Edit
        //     </button>
        //     <button className="btn btn-danger">
        //       <IoTrashBinOutline />
        //     </button>
        //   </td>
        // </tr>
      );
    });
  };

  renderModalEdit = () => {
    let { indexEdit, dataEdit, todo, modalEdit } = this.state;
    if (indexEdit < 0) {
      return;
    }
    // let dataEdit = todo[indexEdit];

    return (
      <Modal isOpen={modalEdit} toggle={this.toggleModalEditHandler}>
        <ModalHeader toggle={this.toggleModalEditHandler}>
          Edit Todo {todo[indexEdit].kegiatan}
        </ModalHeader>
        <ModalBody>
          <input
            type="text"
            name="kegiatan"
            onChange={this.onEditInputHandler}
            value={dataEdit.kegiatan}
            className="form-control my-1"
            placeholder="nama Kegiatan"
          />
          <input
            type="date"
            name="tanggal"
            value={dataEdit.tanggal}
            onChange={this.onEditInputHandler}
            className="form-control my-1"
          />
          <input
            type="time"
            name="jam"
            value={dataEdit.jam}
            onChange={this.onEditInputHandler}
            className="form-control my-1"
          />
          <input
            type="text"
            name="tempat"
            value={dataEdit.tempat}
            onChange={this.onEditInputHandler}
            className="form-control my-1"
            placeholder="tempat"
          />
          <input
            type="text"
            name="gambar"
            value={dataEdit.gambar}
            onChange={this.onEditInputHandler}
            className="form-control my-1"
            placeholder="link foto"
          />
          <select
            value={dataEdit.waktuKegiatan}
            onChange={this.onEditInputHandler}
            name="waktuKegiatan"
            className="form-control my-1"
          >
            <option value="0" hidden>
              pilihan jam
            </option>
            <option value="2">2 jam</option>
            <option value="3">3 jam</option>
            <option value="5">5 jam</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={this.onSaveEditClick}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={this.toggleModalEditHandler}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    const { todo, indexDel, modalDel } = this.state;
    return (
  
      <div className="px-5 d-flex align-items-center flex-column">
        {/* modal Add */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModalHandler}>
          <ModalHeader toggle={this.toggleModalHandler}>Add Todo</ModalHeader>
          <ModalBody>
            <input
              type="text"
              name="kegiatan"
              onChange={this.onAddInputHandler}
              value={this.state.dataAdd.kegiatan}
              className="form-control my-1"
              placeholder="nama Kegiatan"
            />
            <input
              type="date"
              name="tanggal"
              value={this.state.dataAdd.tanggal}
              onChange={this.onAddInputHandler}
              className="form-control my-1"
            />
            <input
              type="time"
              name="jam"
              value={this.state.dataAdd.jam}
              onChange={this.onAddInputHandler}
              className="form-control my-1"
            />
            <input
              type="text"
              name="tempat"
              value={this.state.dataAdd.tempat}
              onChange={this.onAddInputHandler}
              className="form-control my-1"
              placeholder="tempat"
            />
            <input
              type="text"
              name="gambar"
              value={this.state.dataAdd.gambar}
              onChange={this.onAddInputHandler}
              className="form-control my-1"
              placeholder="link foto"
            />
            <select
              value={this.state.dataAdd.waktuKegiatan}
              onChange={this.onAddInputHandler}
              name="waktuKegiatan"
              className="form-control my-1"
            >
              <option value="0" hidden>
                pilihan jam
              </option>
              <option value="2">2 jam</option>
              <option value="3">3 jam</option>
              <option value="5">5 jam</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.onAddTodoClick}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.toggleModalHandler}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        {/* modal Add  finished*/}

        {/* modal Del */}
        <Modal centered isOpen={modalDel} toggle={this.toggleModalDelHandler}>
          <ModalHeader toggle={this.toggleModalDelHandler}>
            Delete Todo
          </ModalHeader>
          <ModalBody>
            jadi nggak hapus kegiatan{" "}
            {indexDel < 0 ? "" : todo[indexDel].kegiatan}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={this.onConfirmDeleteClick}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.toggleModalDelHandler}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        {/* modal Del Finish */}
        {this.renderModalEdit()}

        <h1 className="mt-4">Todo List</h1>
        <Link className='normal' to='/page'><h1>To page</h1></Link>
        <button
          onClick={this.toggleModalHandler}
          className="mt-2 btn btn-outline-success align-self-start"
        >
          Add Todo
        </button>
        {
          this.state.loading?
          <div className='mt-2 tinggi d-flex justify-content-center align-items-center' style={{width:'100%'}}>
            <Spinner color='primary'/>
          </div>
          :
        <Table className="mt-2 tinggi" striped>
          <thead>
            <tr>
              <th>No</th>
              <th>tanggal</th>
              <th style={{ width: "10%" }}>jam</th>
              <th>nama Kegiatan</th>
              <th style={{ width: "25%" }}>Gambar</th>
              <th style={{ width: "10%" }}>berapa lama (jam)</th>
              <th>tempat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderKegiatan()}</tbody>
        </Table>
        }
      </div>
    );
  }
}

export default Home;
