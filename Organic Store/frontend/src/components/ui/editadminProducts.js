import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class editadminProducts extends Component {
    constructor(props) {
        super(props);


        this.onchangeTitle = this.onchangeTitle.bind(this);
        this.onchangeDescription = this.onchangeDescription.bind(this);
        this.onchangePrice = this.onchangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let loggedIn = true;

        const token = localStorage.getItem('auth-token')
        if (!token) loggedIn = false;

        this.state = {
            title: '',
            description: '',
            price: '',
            loggedIn

        }
    }


    componentDidMount() {
        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('auth-token')
            }
        };
        axios.get('http://localhost:5000/api/singleproduct/' + this.props.match.params.id, config)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price

                });

            })
            .catch((err) => {
                console.log(err);
            })
    }

    onchangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onchangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onchangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    logout() {
        localStorage.removeItem('auth-token')

        window.location = '/admin-login ';

    }

    onSubmit(e) {

        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('auth-token')
            }
        };
        axios.post('http://localhost:5000/api/update/' + this.props.match.params.id, formData, config)
            .then(res => console.log(res.data));

        this.setState({
            title: '',
            description: '',
            price: ''
        })
        window.location = '/admin-products ';
    }


    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin-login" />
        }
        return (
            <div>
                <header>
                    <h3 className="h3">Organic Store</h3>
                    <nav>
                        <ul className="nav_links">
                            <li><h3 onClick={this.logout} className="logout">Logout<img className="logo" alt="logo" src="https://img.icons8.com/dusk/64/000000/logout-rounded-up.png"></img></h3></li>
                        </ul>
                    </nav>
                </header>
                <header className="add_items">
                    <h3 className="h3_add" onClick={() => this.addItems()}>Update Items</h3>
                </header><hr /><br />

                <div className="form-products-list">
                    <form onSubmit={this.onSubmit}><br />
                        <label>Title</label><br />
                        <input type="text" name="title" value={this.state.title} onChange={this.onchangeTitle} required /><br /><br />
                        <label>Description</label><br />
                        <input type="text" name="description" value={this.state.description} onChange={this.onchangeDescription} required /><br /><br />
                        <label>Price</label><br />
                        <input type="number" name="price" className="price" value={this.state.price} onChange={this.onchangePrice} required /><br /><br /><br />
                        <br /><br />

                        <input type="submit" value="Update Item" className="addbutton" />  <button onClick='/admin-products' className="addbutton">Cancel</button>
                    </form>
                </div>

            </div>


        )
    }

}
export default editadminProducts;