import React, { Component } from "react";

import EmptyCart from "./EmptyCart";
import "../CSS/Mycart.css";
import Axios from "axios";

let myStorage = window.localStorage;

class Mycart extends Component {
  constructor(){
    super();
    this.state = {
      items: JSON.parse(myStorage.getItem('tempCart')) || []
    };
  }

  // fetch the saved unconfirmed order and add into cart
  async componentDidMount(){

    if(myStorage.getItem('token')){
      let items;
      const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/getOrderDetails/"+myStorage.getItem("username")+"/unconfirmed";
      const response = await Axios.get(url);
        if(response.data.Status === "Success" && response.data.data.length>0 ){
            items = myStorage.getItem('tempCart')? JSON.parse(myStorage.getItem('tempCart')) : [];
            let orderArray = response.data.data[0].orderItems;
            for(var i = 0; i < orderArray.length; i++){
              items.push(orderArray[i]);
            }
            this.setState({
              items
            });
            myStorage.setItem('tempCart', JSON.stringify(items));
            // deleting the unconfirmed order from dB since each user can have only one unconfirmed order
            await Axios.delete("https://csci-5709-shoppingkart-group24.herokuapp.com/orders/removeOrderData/"+myStorage.getItem("username")+"/unconfirmed");
        }
    }
  }

  /* localStorage will have user's unconfirmed order throughout the session,
  if user not logged in then save unconfirmed items to browser's localStorage for next session
  */
  handleLocalStorage(){
    myStorage.setItem('tempCart', JSON.stringify(this.state.items));
  }

  handleIncrement(index) {
    let items = this.state.items;
    items[index].quantity = items[index].quantity + 1;
    items[index].totalPrice = items[index].price * items[index].quantity;
    this.setState({
      items,
    });
    this.handleLocalStorage();
  }

  handleDecrement(index) {
    let items = this.state.items;
    if (items[index].quantity > 1) {
      items[index].quantity = items[index].quantity - 1;
      items[index].totalPrice = items[index].price * items[index].quantity;
      this.setState({
        items,
      });
    }
    this.handleLocalStorage();
  }

  deleteCard(index) {
    let items = this.state.items.filter((c) => c.name !== index);
    this.setState({ items },this.handleLocalStorage);
  }

  findTotal() {
    let total = 0;
    this.state.items.map((result) => (total = parseInt(total) + parseInt(result.totalPrice)));
    return total;
  }

  getEmptyCart() {
    if (this.state.items.length === 0) {
      myStorage.removeItem('tempCart');
      myStorage.removeItem('id');
      return (
        <div>
          <EmptyCart />
        </div>
      );
    }
  }

  getSubTotal() {
    if (this.state.items.length > 0) {
      return (
        <div className="totalDiv">
          <span className="totalDiv-title">SubTotal :</span>
          <span className="totalDiv-value">${this.findTotal()}</span>
        </div>
      );
    }
  }

  async orderCheckout(){
    const user = window.localStorage.getItem("username");
    const cart = window.localStorage.getItem('tempCart');

    if(user !== null){
      if(cart === null || JSON.parse(cart).length === 0){
        alert("Please add product to cart before checking out");
        this.props.history.push({
          pathname: "/"
        })
      }else{
        this.props.history.push({
          pathname: "/orderConfirmation",
          data: this.state.items,
        })
      }
    }else {
      this.props.history.push({
        pathname: "/login"
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          <p className="mainTitle"> Your Shopping Cart </p>
        </div>
        <div style={{ display: "flex" }}>
          <div className="left-div">
            <div className="itemsDiv">
              {this.state.items.map((result, index) => (
                <div className="orderDiv">
                  <img
                    src={result.img}
                    alt="grocery item"
                    className="orderedImages"
                  />
                  <div>
                    <p className="orderTitle">{result.name}</p>
                    <div className="priceQuantityTotalDiv">
                      <div className="price-Total-div">
                        <span className="price-total-quantity">Price : </span>
                        <span className="values">${result.price}</span>
                      </div>
                      <div className="quantityDiv">
                        <div>
                          <p className="price-total-quantity">Quantity</p>
                        </div>
                        <div className="orderDiv-info-quantity-button">
                          <button
                            className="minusButton"
                            onClick={() => this.handleDecrement(index)}
                          >
                            -
                          </button>
                          <p className="values">{result.quantity}</p>
                          <button
                            className="plusButton"
                            onClick={() => this.handleIncrement(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="price-Total-div">
                        <span className="price-total-quantity">Total : </span>
                        <span className="values">${result.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="removeButton"
                      onClick={() => this.deleteCard(result.name)}
                    >
                      Remove this item
                    </button>
                  </div>
                </div>
              ))}
              {this.getEmptyCart()}
            </div>

          </div>
          <div>
            <div>
              <p className="right-div-title"> Order summery</p>
            </div>
            <div>{this.getSubTotal()}</div>
            <div className="checkout-div">
              <button
                className="checkoutButton"
                onClick={() => this.orderCheckout()}
              >
                Checkout Securely Now{" "}
              </button>
            </div>
            <p className="discountText">
              Apply coupons, Discount on the next step
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Mycart;
