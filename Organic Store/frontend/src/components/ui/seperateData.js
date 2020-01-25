import React from 'react';
import { Link } from 'react-router-dom';


const SeperateData = props => {
    return (
        <tr>

            <td>{<img className="imgviewdata" src={"http://localhost:5000/uploads/" + props.sepdata.productImage} alt="preview" />}</td>
            {/* <td>{props.sepdata.productImage}</td> */}
            <td>{props.sepdata.title}</td>
            <td>{props.sepdata.description}</td>
            <td>${props.sepdata.price}</td>
            <td>
                <Link to={"/edit/" + props.sepdata._id} >edit</Link> | <button className="addbutton adbtn" onClick={() => { if (window.confirm('Remove the Item?')) { props.deleteData(props.sepdata._id) } }}>delete</button>
            </td>

        </tr>
    )
}

export default SeperateData;