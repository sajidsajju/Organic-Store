import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 

class home extends Component {
    render(){
        return(
            
            <div className="body">
                <h1 className="title">Organic Store</h1>
                <div className="container">
                    <Link to="/user" className="sign">User Login</Link><br/><hr className="hr"/>
                    <Link to="/admin" className="sign">Admin Login</Link>

                </div>
            </div>
           
        )
    }
}


export default home;