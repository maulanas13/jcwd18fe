import React from 'react';
import { IoTrashBinOutline,IoHome } from "react-icons/io5";
import { AiOutlineEdit,AiFillClockCircle,AiTwotoneClockCircle, } from "react-icons/ai";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import PropTypes from 'prop-types';

const TableRow = ( props)=>{
    let {index,val,onDeleteClick}=props

    const renderTanggalProper = (tanggal) => {
        const event = new Date(tanggal);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return event.toLocaleDateString("id-ID", options);
      };
    
    return(
        <div className="col-md-4 px-4 my-3 rounded overflow-hidden">
            <Card>
                <CardImg top width="100%" src={val.gambar} className='tinggi' alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5" className='text-capitalize'>{val.kegiatan}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{renderTanggalProper(val.tanggal)}</CardSubtitle>
                    <CardText>
                        <div>
                            <AiFillClockCircle className='mb-1'/> {val.jam} WIB
                        </div>
                        <div>
                            <AiTwotoneClockCircle className='mb-1'/> {val.waktuKegiatan} jam
                        </div>
                        <div>
                            <IoHome className='mb-1'/> {val.tempat}
                        </div>
                    </CardText>
                    <div className='d-flex justify-content-end'>
                        <button className="btn btn-primary mr-3">
                            <AiOutlineEdit className='mb-1' /> Edit
                        </button>
                        <button className="btn btn-danger" onClick={()=>onDeleteClick(index)} >
                            <IoTrashBinOutline className='mb-1'/> Delete
                        </button>

                    </div>
                </CardBody>
            </Card>
        </div>
    // <tr >
    //     <td>{index + 1}</td>
    //     <td>{renderTanggalProper(val.tanggal)}</td>
    //     <td style={{ width: "10%" }}>{val.jam}</td>
    //     <td>{val.kegiatan}</td>
    //     <td style={{ width: "30%" }}>
    //       <img alt={"gambar"} src={val.gambar} height={200} />
    //     </td>
    //     <td style={{ width: "10%" }}>{val.waktuKegiatan} jam </td>
    //     <td>{val.tempat}</td>
    //     <td>
    //       <button className="btn btn-primary mr-3">
    //         <AiOutlineEdit /> Edit
    //       </button>
    //       <button className="btn btn-danger" onClick={()=>onDeleteClick(index)} >
    //         <IoTrashBinOutline />
    //       </button>
    //     </td>
    //   </tr>
    )
}

TableRow.propTypes = {
    index:PropTypes.number,
    val : PropTypes.object.isRequired,
    onDeleteClick:PropTypes.func
}
export default TableRow