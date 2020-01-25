import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 

class user extends Component {
    render(){
        return(
            
            <div className="body">
                <h1 className="title">Organic Store</h1>
                <div className="container">
                    <Link to="/register" className="sign" >Sign-Up</Link><br/><hr className="hr"/>
                    <Link to="/login" className="sign">Login</Link>

                </div>
            </div>
           
        )
    }
}


export default user;