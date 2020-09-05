import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import card from "../Images/card.png";
import COD from "../Images/COD.jpeg";
import "../CSS/Checkout.css";
import 'react-credit-cards/es/styles-compiled.css';
import Axios from "axios";
import Cards from 'react-credit-cards';

let storage = window.localStorage;

class Checkout extends Component {
  state = {
    items: this.props.location.data,
    firstname: "",
    lastname: "",
    address: "",
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    showCredInfo: false,
    discount: "",
    showdiscount: false
  };


  findTotal() {
    let total = 0;
    this.state.items.map((result) => (total = parseInt(total) + parseInt(result.totalPrice)));
    return total;
  }

  getSubTotal() {
    if (this.state.items.length > 0) {
      return (
        <div className="totalDivOrder">
          <span className="totalDivspan">SubTotal :</span>
          <span className="totalDivValue">${this.findTotal()}</span>
        </div>
      );
    }
  }

  getDiscount() {

    let discount;
    if (this.state.discount === "") {
      discount = 0
    }
    else {
      discount = (parseFloat(this.state.discount) / 100) * this.findTotal()
    }
    return discount;

  }

  makeEmpty() {
    document.getElementById("discountcode").value = ""
}

  // get the user details for order confirmation
  async componentDidMount() {
    const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/getUserDetails/" + storage.getItem('username');
    const response = await Axios.get(url);
    if (response.data.Status === "Success") {
      this.setState({
        firstname: response.data.data[0].firstname,
        lastname: response.data.data[0].lastname,
        address: response.data.data[0].address
      })
    }
  }

  async saveAddress() {
    document.getElementById("address").contentEditable = false;

    const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/changeAddress/" + storage.getItem('username');
    await Axios.put(url, {
      username: storage.getItem('username'),
      address: document.getElementById("address").textContent,
    }).then(function (response) {
    });
  }

  async proceedWithOrder() {
    const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/addToCart/";
    await Axios.post(url, {
      username: storage.getItem("username"),
      orderItems: this.state.items,
      grandTotal: this.findTotal() - this.getDiscount()+ 5.66,
      orderStatus: "Confirmed"
    }).then(res => {
      var i;
      var productIds = [];
      for (i = 0; i < this.state.items.length; i++) {
        productIds[i] = { id: this.state.items[i].id, cartQuan: this.state.items[i].quantity };
      }
      Axios.post("https://csci-5709-shoppingkart-group24.herokuapp.com/product/setProductDetails/", {
        productIds: productIds
      }).then(res => {
      });
      this.props.history.push({
        pathname: '/'
      });
      alert("Order Placed Successfully");
    });
  }
  async placeOrder() {
    if (this.checkEmpty()) {
      for (let i=0; i<this.state.items.length;i++){
        await Axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/product/getProductDetails/" + this.state.items[i].id).then(
            res => {
              if(res.data != null) {
                if(this.state.items[i].quantity > res.data.data[0].productQuantity){
                  alert(this.state.items[i].name + " currently unavailable");
                  i = this.state.items.length;
                } else {
                  if( i === (this.state.items.length -1)){
                    this.proceedWithOrder();
                  }
                }
              }

            }
        );
      }

    }



    this.removeOrder();
    // clearing the localStorage when order is confirmed
    storage.removeItem('tempCart');
    storage.removeItem('id');

  }

  //this function will apply discount for the order based on the promocode
  async applyDiscount() {
    let current = this;
    const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/discounts/getdiscount/" + document.getElementById("discountcode").value;
    await Axios.get(url).then(function (response) {
      if (response.data.Status === "Success" && response.data.data.length > 0) {
        current.setState({
          discount: response.data.data[0].discount,
          showdiscount: true
        });
        alert("applied "+ current.state.discount + "% discount")
      }
      else{
        alert("No discount tagged to the promocode")
        current.makeEmpty()
      }
    }).catch(err => { console.log(err) });
  }

  // this function will remove unconfirmed order from dB once order is confirmed
  async removeOrder() {
    const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/removeOrderData/" + storage.getItem("username") + "/unconfirmed";
    await Axios.delete(url);
  }

  getUseraddress() {
    return this.state.address === "" || this.state.address == null ? "No address found. Update your address" : this.state.address;
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  showCard() {
    this.setState({ showCredInfo: true })
  }

  hideCard() {
    this.setState({ showCredInfo: false })
  }

  // To check if required details are filled by the user
  checkEmpty() {
    // check if address is filled by the user
    if (document.getElementById("address").textContent === "No address found. Update your address") {
      alert("Please enter address");
      return false;
    }
    // check if card details are filled if method of payment is credit/debit card
    else if (document.getElementById("cardpayment").checked) {
      if (this.state.showCredInfo === true) {
        if (this.state.name === "" || this.state.expiry === "" || this.state.number === "" || this.state.cvc === "") {
          alert("Please fill all card details");
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return true;
      }
    }
    else if (document.getElementById("codpayment").checked) {
      return true;
    }
    else {
      alert("Please select payment method");
      return false;
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <p className="mainTitle">Order Confirmation</p>
          </div>
          <div style={{ display: "flex" }}>
            <div className="left-div-order">
              <div className="left-div-delivery-div">
                <div>
                  <div className="left-div-delivery-title">
                    {" "}
                    Delivery Address
                  </div>
                </div>
                <div className="left-div-address-div">
                  <div id="contactDetails" className="contactDiv">
                    <b id="userName">{this.state.firstname} {this.state.lastname}</b>
                    <div id="address" className="addressDiv">
                      {this.getUseraddress()}
                    </div>
                  </div>
                  <div className="left-div-edit-save-div">
                    <button
                      onClick={() =>
                        (document.getElementById(
                          "address"
                        ).contentEditable = true)
                      }
                      className="edit-save-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.saveAddress()}
                      className="edit-save-button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="left-div-delivery-div">
                <div className="left-div-delivery-title">Payment Method</div>
                <div className="left-div-address-div">
                  <div style={{ display: "flex", padding: "5px 5px 5px 5px" }}>
                    <input type="radio" value="Card" name="payment" id="cardpayment" onClick={() => this.showCard()} />
                    <img src={card} className="radio-button-img" alt="test" />
                    Credit/Debit Card

                  </div>
                  {this.state.showCredInfo ? (
                    <div id="PaymentForm" className="payment-container container">
                      <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                      />
                      <form className="card-form">
                        <div className="form-group">
                          <input
                            type="tel"
                            name="number"
                            className="card-ip"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="card-ip"
                            placeholder="Name"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <input
                              type="tel"
                              name="expiry"
                              className="form-control"
                              placeholder="Valid Thru"
                              pattern="\d\d/\d\d"
                              required
                              onChange={this.handleInputChange}
                              onFocus={this.handleInputFocus}
                            />
                          </div>
                          <div className="col-4">
                            <input
                              type="tel"
                              name="cvc"
                              className="form-control"
                              placeholder="CVC"
                              pattern="\d{3,4}"
                              required
                              onChange={this.handleInputChange}
                              onFocus={this.handleInputFocus}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", padding: "5px 5px 5px 5px" }}>
                    <input type="radio" value="COD" name="payment" id="codpayment" onClick={() => this.hideCard()} />
                    <img src={COD} style={{ height: "100px", width: "100px" }} alt={"test"}/>
                    Cash On Delivery
                    <div className="radio-button-img" alt="test" />
                  </div>
                </div>
              </div>
              <div className="left-div-delivery-div">
                <div className="left-div-delivery-title">Your grocery bag </div>
                <div className="left-div-address-div">
                  <CardDeck>
                    {this.state.items.map((result) => (
                      <Card className="cardDeck">
                        <Card.Img
                          variant="top"
                          src={result.img}
                          className="items-size"
                        />
                        <Card.Body className="cardBody">
                          <Card.Title className="cardTitle">
                            {result.name}
                          </Card.Title>
                        </Card.Body>
                        <Card.Footer className="cardFooter">
                          <small className="text-muted">
                            ${result.totalPrice}
                          </small>
                        </Card.Footer>
                      </Card>
                    ))}
                  </CardDeck>
                </div>
              </div>
            </div>
            <div className="right-div-order">
              <div>
                <p className="right-div-mainTitle"> Order summary</p>
              </div>
              <div>{this.getSubTotal()}</div>
              <div>
              {
                    this.state.showdiscount && (
                      <div className="totalDivOrder">
                        <span className="totalDivspan"> Discount: </span>
                        <span className="totalDivValue"> ${this.getDiscount()}  </span>
                      </div>
                    )
              }
              </div>
              <div className="totalDivOrder">
                <span className="totalDivspan">Delivery Charges:</span>
                <span className="totalDivValue"> $5.66</span>
              </div>
              <div className="totalDivOrder">
                <span className="totalDivspan grandTotal"> Grand Total:</span>
                <span className="totalDivValue grandTotal">
                  ${this.findTotal() - this.getDiscount() + 5.66 }
                </span>
              </div>
              <div className="discountDiv">
                <span htmlFor="discount" className="discountDivTitle">
                  Discount code
                </span>
                <div>
                  <input
                    type="text"
                    name="discount"
                    id="discountcode"
                    className="discountInput"

                  />
                  <br />
                  <br />
                  <button className="discountButton" onClick={() => this.applyDiscount()}>Apply</button>
                </div>
              </div>
              <div className="checkout-div">
                <button
                  className="checkoutButton"
                  onClick={() => this.placeOrder()}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Checkout;
