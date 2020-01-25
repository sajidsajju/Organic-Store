import React from 'react';

const UserCartData = props => {
    return (

        <tr>

            <td>{<img className="imgviewdata" src={"http://localhost:5000/uploads/" + props.sepdata.productImage} alt="preview" />}</td>
            {/* <td>{props.sepdata.productImage}</td> */}
            <td>{props.sepdata.title}</td>
            <td>{props.sepdata.description}</td>
            <td>${props.sepdata.price}</td>
            <td>
                <button className="addbutton adbtn" onClick={() => { if (window.confirm('Remove the Item?')) { props.deleteData(props.sepdata._id) } }}>delete</button>
            </td>

        </tr>

    )
}

export default UserCartData;