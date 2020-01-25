import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SeperateUserData from './seperateUserData';


class userProducts extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        let loggedIn = true;

        const token = localStorage.getItem('user-auth-token')
        if (!token) loggedIn = false;

        this.state = {
            loading: true,
            loggedIn,
            viewData: [],
            title: '',
            description: '',
            id: '',
            price: '',
            productImage: '',
            user: ''


        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/products-list', {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('user-auth-token')
            }
        })
            .then(res => {
                this.setState({ viewData: res.data.productsList, loading: false });
            })
            .catch((err) => {
                console.log(err);
            })
    }


    addToCart(id) {

        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('user-auth-token')
            }
        };

        console.log(id);
        axios.get('http://localhost:5000/user/add-user-cart/' + id, config)
            .then(resp => { console.log(resp.data) })
            .catch((err) => { console.log(err) })


    }



    dataList() {
        return this.state.viewData.map(currentdata => {
            return <SeperateUserData sepdata={currentdata} addToCart={this.addToCart} key={currentdata._id} />;
        })
    }


    logout() {
        localStorage.removeItem('user-auth-token')
        this.setState({
            loggedIn: false
        })

    }
    usercart() {
        window.location = "/userCart"
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }

        return (
            <div>
                <header>
                    <h3 className="h3">Organic Store</h3>
                    <nav>
                        <ul>
                            <li><img className="cartlogo" onClick={this.usercart} alt="cart logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2016/07/000749-online-store-logos-design-free-online-E-commerce-cart-logo-maker-04.png"></img></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="nav_links">
                            <li><h3 onClick={this.logout} className="logout">Logout<img className="logo" alt="logo" src="https://img.icons8.com/dusk/64/000000/logout-rounded-up.png"></img></h3></li>
                        </ul>
                    </nav>
                </header>
                <div>
                    {this.state.loading ?
                        <SkeletonTheme color="#555" highlightColor="#ef4478">
                            <Skeleton count={50} />
                        </SkeletonTheme>
                        :
                        <div className="items">

                            {this.dataList()}

                        </div>

                    }
                </div>
            </div>


        )
    }
}

export default userProducts;