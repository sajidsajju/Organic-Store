import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import UserCartData from './userCartData';

class userCart extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.totalamount = this.totalamount.bind(this);

        let loggedIn = true;

        const token = localStorage.getItem('user-auth-token')
        if (!token) loggedIn = false;

        this.state = {
            loading: true,
            loggedIn,
            viewData: [],
            total: 0
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/user-products-list', {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('user-auth-token')
            }
        })
            .then(res => {
                this.setState({ viewData: res.data.productsList, loading: false })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    deleteData(id) {
        const config = {
            headers: {
                'content-type': 'application/json-data',
                'Authorization': "Bearer " + localStorage.getItem('user-auth-token')
            }
        };
        axios.delete('http://localhost:5000/user/delete/' + id, config)
            .then(res => console.log(res.data));

        this.setState({
            viewData: this.state.viewData.filter(el => el._id !== id)
        })

    }
    dataList() {
        return this.state.viewData.map(currentdata => {
            return <UserCartData sepdata={currentdata} deleteData={this.deleteData} key={currentdata._id} />;
        })
    }
    usercart() {
        window.location = "/user-products"
    }

    totalamount() {
        let total = 0;
        this.state.viewData.map((doc) => {
            return total += parseInt(doc.price, 10)
        });
        return total;

    }

    logout() {
        localStorage.removeItem('user-auth-token')
        this.setState({
            loggedIn: false
        })

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
                            <li><img className="cartlogo" onClick={this.usercart} alt="cart logo" src="http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png"></img></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="nav_links">
                            <li><h3 onClick={this.logout} className="logout">Logout<img className="logo" alt="logo" src="https://img.icons8.com/dusk/64/000000/logout-rounded-up.png"></img></h3></li>
                        </ul>
                    </nav>
                </header>
                {
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
                                        <th>Remove Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dataList()}
                                </tbody>


                                <tfoot className="tfootclass">

                                    <tr className="tfoot">

                                        <td id="tfootid" colSpan="2" className="tfootclass">Grand Total  </td>
                                        <td id="tfootid" colSpan="1" className="tfootclass">:</td>
                                        <td id="tfootid" colSpan="2" className="tfootclass">${this.totalamount()}</td>
                                    </tr>
                                </tfoot>

                            </table>

                        </div>
                }

            </div>


        )
    }
}

export default userCart;