import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "./Home";
import Profile from "./UserProfile";
import Register from "./Signup";
import Login from "./Login";
import Result from "./SearchResults";
import ProductDetails from "./ProductDetails";
import OrderHistory from "./Orders";
import Cart from "./Mycart";
import OrderConfirmation from "./Checkout";
import Help from "./Help";
import Logout from "./Logout";
import AdminHome from "./AdminHome"
import CreateProduct from "./InsertProduct"
import DeleteProduct from "./DeleteProduct"
import UpdateProduct from "./UpdateProduct"
import AdminUserHome from "./AdminUserHome";
import AdminInventoryHome from "./AdminInventoryHome"
import ManageDiscount from "./ManageDiscount"
import UpdateDiscount from "./UpdateDiscount"
import DeleteDiscount from "./DeleteDiscount"
import DiscountData from "./DiscountData"

const user = window.localStorage.getItem("username");
let status = false;
let check = false;

if((user !== null) && (user.toLowerCase() !== "admin")){
    status = true;
}
else if((user !== null) && (user.toLowerCase() === "admin")){
    check = true;
}


const AdminRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render = {(props) => (
        check
        ? (<Component {...props} />)
        : (<Redirect to={{pathname: "/login"}}/>)
        )} />
    )

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render = {(props) => (
        status
        ? (<Component {...props} />)
        : (<Redirect to={{pathname: "/login"}}/>)
        )} />
    )

class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/admin' component={AdminHome}/>
                <AdminRoute exact path='/adminUserManagement' component={AdminUserHome}/>
                <AdminRoute exact path='/adminInventoryManagement' component={AdminInventoryHome}/>      
                <AdminRoute exact path='/createProduct' component={CreateProduct}/>
                <AdminRoute exact path='/removeProduct' component={DeleteProduct}/>
                <AdminRoute exact path='/updateProduct' component={UpdateProduct}/>
                <AdminRoute exact path='/manageDiscount' component={ManageDiscount}/>
                <AdminRoute exact path='/updateDiscount' component={UpdateDiscount}/>
                <AdminRoute exact path='/removeDiscount' component={DeleteDiscount}/>
                <AdminRoute exact path='/alldiscounts' component={DiscountData}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path= '/login' component={Login}/>
                <Route exact path='/result' component={Result}/>
                <Route exact path='/product' component={ProductDetails} />
                <Route exact path='/order-history' component={OrderHistory} />
                <Route exact path="/mycart" component={Cart}/>
                <Route exact path="/logout" component={Logout}/>
                <PrivateRoute exact path='/orderConfirmation' component={OrderConfirmation}/>
                <Route exact path='/help' component={Help}/>
            </Switch>
        );
    }
}

export default Routes;
