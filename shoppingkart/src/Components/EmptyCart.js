import React, { Component } from "react";
import emptyCart from "../Images/emptyCart.png";
import "../CSS/Mycart.css";

export class EmptyCart extends Component{
    render() {
        return (
          <div className="emptyCart">
            <div>
                <img src={emptyCart} className="emptyCart-img" alt="test"/>
            </div>
            <div className="emptyCart-label-div">
                <p className="emptyCart-label">Your cart is empty</p>
                <a href="./" className="emptyCart-label"> Start Shopping </a>
            </div>
          </div>
        );
      }
}

export default EmptyCart;
