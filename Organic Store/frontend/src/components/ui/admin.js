import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class admin extends Component {
    render() {
        return (
            <div className="adminbody">
                <h1 className="title">Organic Store</h1>
                <div className="container">
                    <Link to="/admin-register" className="sign">Sign-Up</Link><br /><hr className="hr" />
                    <Link to="/admin-login" className="sign">Login</Link>

                </div>


            </div>
        )
    }
}


export default admin;