import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class adminRegister extends Component {
    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeConfirmPassword = this.onchangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            message: ''
        }
    }
    componentDidMount() {
        this.setState({
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            message: ''
        })
    }

    onchangeName(e) {
        this.setState({
            name: e.target.value
        });
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
    onchangeConfirmPassword(e) {
        this.setState({
            confirm_password: e.target.value
        });
    }

    onSubmit(e) {

        e.preventDefault();

        const adminReg = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }
        // window.location = '/admin-login';
        // console.log(adminReg);
        axios.post('http://localhost:5000/api/admin/register', adminReg)
            .then(res => this.setState({
                message: res.data
            }));

        this.setState({
            password: '',
            confirm_password: ''
        })
    }


    render() {
        return (
            <div className="form-bg">
                <h1 className="admin_h1">ADMIN SIGN-UP</h1>

                <div className="form-border"><br />
                    <div className="error"> {this.state.message}</div>
                    <form onSubmit={this.onSubmit}><br />
                        <label>Name</label><br />
                        <input type="text" name="name" value={this.state.name} onChange={this.onchangeName} required /><br /><br />
                        <label>Email</label><br />
                        <input type="email" name="email" value={this.state.email} onChange={this.onchangeEmail} required /><br /><br />
                        <label>Password</label><br />
                        <input type="password" name="password" value={this.state.password} onChange={this.onchangePassword} required /><br /><br />
                        <label>Confirm-Password</label><br />
                        <input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.onchangeConfirmPassword} required /><br /><br />
                        <input type="submit" value="submit" className="button" /><br /><br /><label>Already a user ? </label><a href="/admin-login" >SIGN IN</a>
                    </form>
                </div>
            </div>
        )
    }
}


export default adminRegister;

