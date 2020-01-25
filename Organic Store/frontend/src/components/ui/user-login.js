import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';


class userLogin extends Component {

    constructor(props) {
        super(props);



        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let loggedIn = false;

        const token = localStorage.getItem('user-auth-token')
        if (token) loggedIn = true;



        this.state = {
            email: '',
            password: '',
            loggedIn,
            error: ''
        }
    }

    onchangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onchangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {

        e.preventDefault();

        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        // window.location = '/admin-login';


        axios.post('http://localhost:5000/api/user/login', userLogin)
            .then(res => {
                if (res.data === 201) {
                    this.setState({ loggedIn: false, error: '*Email/Password should be greater than 6!' });
                }
                else if (res.data === 202) {
                    this.setState({ loggedIn: false, error: '*Email Doesnot Exist!' });
                }
                else if (res.data === 203) {
                    this.setState({ loggedIn: false, error: '*Invalid Email/Password!' });
                }
                else {
                    localStorage.setItem('user-auth-token', res.data);
                    this.setState({ loggedIn: true, error: '' });
                }

            })

            .catch(err => console.log(err));

    }



    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to="/user-products" />
        }
        return (

            <div className="form-bg">
                <h1 className="admin_h1">LOGIN</h1>

                <div className="form-border"><br />
                    <div className="error"> {this.state.error}</div>
                    <form onSubmit={this.onSubmit}><br />
                        <label>Email</label><br />
                        <input type="email" name="email" value={this.state.email} onChange={this.onchangeEmail} required /><br /><br />
                        <label>Password</label><br />
                        <input type="password" name="password" value={this.state.password} onChange={this.onchangePassword} required /><br /><br />
                        <input type="submit" value="submit" className="button" /><br /><br /><label>Not a user ? </label><a href="/register" >SIGN UP</a>
                    </form>
                </div>
            </div>
        )
    }
}


export default userLogin;

