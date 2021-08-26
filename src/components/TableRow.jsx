import React from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";



const TableRow = ( props)=>{
    let {index,val,onDeleteClick,onEditClick}=props

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
    <tr >
        <td>{index + 1}</td>
        <td>{renderTanggalProper(val.tanggal)}</td>
        <td style={{ width: "10%" }}>{val.jam}</td>
        <td>{val.kegiatan}</td>
        <td style={{ width: "30%" }}>
          <img alt={"gambar"} src={val.gambar} height={200} />
        </td>
        <td style={{ width: "10%" }}>{val.waktuKegiatan} jam </td>
        <td>{val.tempat}</td>
        <td>
          <button className="btn btn-primary mr-3" onClick={()=>onEditClick(index)}>
            <AiOutlineEdit /> Edit
          </button>
          <button className="btn btn-danger" onClick={()=>onDeleteClick(index)} >
            <IoTrashBinOutline />
          </button>
        </td>
      </tr>
    )
}

export default TableRow