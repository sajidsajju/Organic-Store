import React from 'react';
import { BrowserRouter as Router, Route, Switch /*, Switch, Link, Redirect*/ } from 'react-router-dom';
import home from './components/ui/home';
import admin from './components/ui/admin';
import user from './components/ui/user';
import adminRegister from './components/ui/admin_register';
import adminLogin from './components/ui/admin_login';
import userLogin from './components/ui/user-login';
import userRegister from './components/ui/user-register';
import Whoops404 from './components/ui/Whoops404';
import adminProducts from './components/ui/adminProducts';
import editadminProducts from './components/ui/editadminProducts';
import userProducts from './components/ui/userProducts';
import userCart from './components/ui/userCart';

function App() {
  return (
    <Router>

      {/* <Route path={"/"} >
          <Redirect to="/user"/>
          </Route> */}
      <Switch>
        <Route exact path={"/"} component={home} />
        <Route path={"/user"} component={user} />
        <Route path={"/admin"} component={admin} />
        <Route path={"/admin-register"} component={adminRegister} />
        <Route path={"/admin-login"} component={adminLogin} />
        <Route path={"/login"} component={userLogin} />
        <Route path={"/register"} component={userRegister} />
        <Route path={"/admin-products"} component={adminProducts} />
        <Route path={"/edit/:id"} component={editadminProducts} />
        <Route path={"/user-products"} component={userProducts} />
        <Route path={"/userCart"} component={userCart} />

        <Route component={Whoops404} />
      </Switch>

    </Router>
  );
}

export default App;
