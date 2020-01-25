import React from 'react';
// import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';


const SeperateUserData = props => {
    return (
        <div className="item">
            <div>
                <h1 className="userviewtitle">{props.sepdata.title}</h1><br /><br />
                <img className="userviewimage" src={"http://localhost:5000/uploads/" + props.sepdata.productImage} alt="preview" /><br />
                <h2 className="userviewdesc">{props.sepdata.description}</h2>
                <br /><hr /><p className="userviewprice">
                    ${props.sepdata.price}
                </p>
                {
                    <div className="add-to-cart" onClick={() => { props.addToCart(props.sepdata._id) }}>
                        <Popup trigger={<h3>ADD TO CART</h3>} position="top center">
                            <div className="popupclass">
                                Item Added to Cart!!
                        </div>
                        </Popup></div>
                }


            </div>
        </div>

    )
}

export default SeperateUserData;