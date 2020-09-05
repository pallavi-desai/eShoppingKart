import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Axios from "axios";

class Logout extends Component {

    handleLogout() {

        const user = window.localStorage.getItem("username");

        if (user !== null) {
            this.saveUserOrder();
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("userid");
            localStorage.removeItem("location");
            alert("User has logged out");
            this.props.history.push("/")
            window.location.reload();
        }
        else {
            alert("User did not login yet");
            this.props.history.push("/");
            window.location.reload();
        }
    }

    /**

    @function author    Pallavi Desai => B00837405

    **/

    // save the cart items as unconfirmed order to dB after logout
    async saveUserOrder(){
        if(window.localStorage.getItem('tempCart') && JSON.parse(window.localStorage.getItem('tempCart')).length>0){
            const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/addToCart/";
            await Axios.post(url, {
                username: window.localStorage.getItem("username"),
                orderItems: JSON.parse(window.localStorage.getItem('tempCart')),
                grandTotal: 0,
                orderStatus: "unconfirmed"
            }).then(function (response) {

            });
            window.localStorage.removeItem('tempCart');
            window.localStorage.removeItem('id');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="form_area">
                    <h5> Are you sure you want to log out?</h5>
                    <button type="submit" className="submit" onClick={() => this.handleLogout()} >
                        <span>Logout</span>
                    </button>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default withRouter(Logout);
