import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SeperateData from './seperateData';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


class adminProducts extends Component {
    constructor(props) {
        super(props);


        this.onchangeImage = this.onchangeImage.bind(this);
        this.onchangeTitle = this.onchangeTitle.bind(this);
        this.onchangeDescription = this.onchangeDescription.bind(this);
        this.onchangePrice = this.onchangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.logout = this.logout.bind(this);

        let loggedIn = true;

        const token = localStorage.getItem('auth-token')
        if (!token) loggedIn = false;

        this.state = {
            loading: true,
            image: '',
            selectedFile: null,
            title: '',
            description: '',
            price: '',
            viewData: [],
            addItems: false,
            viewItems: false,
            loggedIn

        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/user-products-list', {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('auth-token')
            }
        })
            .then(res => {
                this.setState({ viewData: res.data.productsList, loading: false });
            })
            .catch((err) => {
                console.log(err);
            })

        this.setState({
            image: '',
            selectedFile: null,
            title: '',
            description: '',
            price: ''
        })
    }

    deleteData(id) {
        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('auth-token')
            }
        };
        axios.delete('http://localhost:5000/api/delete/' + id, config)
            .then(res => console.log(res.data));

        this.setState({
            viewData: this.state.viewData.filter(el => el._id !== id)
        })

    }
    dataList() {
        return this.state.viewData.map(currentdata => {
            return <SeperateData sepdata={currentdata} deleteData={this.deleteData} key={currentdata._id} />;
        })
    }

    onchangeImage(e) {
        this.setState({
            selectedFile: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0]),
            loaded: 0
        });



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

    onSubmit(e) {

        // e.preventDefault();
        const formData = new FormData();
        formData.append('productImage', this.state.selectedFile);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('auth-token')
            }
        };

        axios.post('http://localhost:5000/api/products', formData, config)
            .then(res => console.log(res.data));

        this.setState({
            image: '',
            title: '',
            description: '',
            price: ''
        })
    }
    addItems() {
        this.setState({
            addItems: true,
            viewItems: false
        })
    }

    viewItems() {
        this.setState({
            addItems: false,
            viewItems: true
        })
    }
    logout() {
        localStorage.removeItem('auth-token')
        this.setState({
            loggedIn: false
        })

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
                    <h3 className="h3_add" onClick={() => this.addItems()}>Add Items</h3><h3 className="h3_add" onClick={() => this.viewItems()}>View Items</h3>
                </header><hr /><br />
                {
                    this.state.addItems ?


                        <div className="form-products-list">
                            <form onSubmit={this.onSubmit}><br />
                                <label>Title</label><br />
                                <input type="text" name="title" value={this.state.title} onChange={this.onchangeTitle} required /><br /><br />
                                <label>Description</label><br />
                                <input type="text" name="description" value={this.state.description} onChange={this.onchangeDescription} required /><br /><br />
                                <label>Price</label><br />
                                <input type="number" name="price" className="price" value={this.state.price} onChange={this.onchangePrice} required /><br /><br />
                                <input type="file" className="inputfile" name="productImage" onChange={this.onchangeImage} required /><br /><br />
                                <img src={this.state.image} className="imagepreview" alt="(Format: jpg/png)"></img>
                                <br /><br />

                                <input type="submit" value="Add Item" className="addbutton" /><br /><br />
                            </form>
                        </div>
                        : null

                }
                {
                    this.state.viewItems ?

                        this.state.loading ?
                            <div>


                                <SkeletonTheme color="#555" highlightColor="#ef4478">
                                    <Skeleton count={30} />
                                </SkeletonTheme>

                            </div>
                            :

                            <div className="tablediv">
                                <table className="datatable">
                                    <thead className="datathead">
                                        <tr>
                                            <th className="viewdataimage">Image</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.dataList()}
                                    </tbody>

                                </table>
                            </div>


                        : null
                }


            </div>


        )
    }
}

export default adminProducts;