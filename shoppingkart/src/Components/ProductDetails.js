import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import Product from './ProductsSpec';
import ProductRating from './ProductRating';
import ProductSpecifics from './ProductSpecifics';
import ProductReviews from './ProductReviews';
import Axios from "axios";

class ProductDetails extends Component {

    productID = this.props.location.state.query;

    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productDescription: "",
            productUrl: "",
            productQuantity: 0,
            productPrice: 0
        };
        //console.log(props)
    }

    async componentDidMount() {
        //console.log("Id " + this.props.location.state.query);
        let url= window.localStorage.getItem('location')?"https://csci-5709-shoppingkart-group24.herokuapp.com/location/getProductDetailsByLocation/"+window.localStorage.getItem('location')+"/"+this.props.location.state.query:"https://csci-5709-shoppingkart-group24.herokuapp.com/product/getProductDetails/" + this.props.location.state.query;
        const productData = await Axios.get(url);
        this.setState({
            productName: productData.data.data[0].productName,
            productDescription: productData.data.data[0].productDescription,
            productUrl: productData.data.data[0].imageURL,
            productQuantity: productData.data.data[0].productQuantity,
            productPrice: productData.data.data[0].productPrice
        })
    }
    //Dropdown for quantity
    onDropdownSelected(e) {
        //console.log("Quantity ", e.target.value);
    }

    // Add dynamic quantity in dropdown
    createSelectuantity() {
        let items = [];
        let counter = 5;
        let start = 1;
        if (this.state.productQuantity < 5) {
            counter = this.state.productQuantity
        }
        if (this.state.productQuantity === 0) {
            start = 0
        }
        for (let i = start; i <= counter; i++) {
            items.push(<option key={i} value={i}>{i}</option>);
        }
        return items;
    }

    //Dynamically change stock label
    getStockText() {
        if (this.state.productQuantity <= 0) {
            return <h6 className="text-danger">No stock left</h6>
        } else {
            return <h6 className="text-success">In stock, Quantity left: {this.state.productQuantity}</h6>
        }
    }
    //Dynamically disable or enable buy now and add to cart button
    getPurchaseButtons() {
        let list = []
        if (this.state.productQuantity <=  0) {
            list.push(<button type="button" className="btn btn-outline-primary w-100" disabled>Buy now</button>);
            list.push(<button type="button" class="btn btn-outline-primary w-100 mt-4" disabled>Add to cart</button>);
        } else {
            list.push(<button type="button" className="btn btn-outline-primary w-100" onClick={() => this.addItemAndRedirectToCart()}>Buy now</button>);
            list.push(<button type="button" class="btn btn-outline-primary w-100 mt-4" onClick={() => this.addItemsToCart()}>Add to cart</button>);
        }
        return list;
    }
    //Handling actions on buy now button click
    addItemAndRedirectToCart() {
        let productArray = window.localStorage.getItem('tempCart') ? JSON.parse(window.localStorage.getItem('tempCart')) : [];

        let count = -1;

        let found = productArray.some(product => {
            count += 1;
            return product.id === this.productID;
        });

        if (found) {
            productArray[count].quantity += parseInt(document.getElementById("quantitySelectBox").value);
            productArray[count].totalPrice = parseInt(productArray[count].totalPrice) + (parseInt(this.state.productPrice) * parseInt(document.getElementById("quantitySelectBox").value));
        } else {
            productArray.push({
                id: this.productID,
                name: this.state.productName,
                img: this.state.productUrl,
                quantity: parseInt(document.getElementById("quantitySelectBox").value),
                price: parseInt(this.state.productPrice),
                totalPrice: (parseInt(document.getElementById("quantitySelectBox").value) * parseInt(this.state.productPrice))
            });
        }
        window.localStorage.setItem('tempCart', JSON.stringify(productArray));

        alert("Item is added to Cart");

        this.props.history.push('/mycart', { 'query': this.props.id })
    }
    // adding the product to localStorage
    addItemsToCart() {

        let productArray = window.localStorage.getItem('tempCart') ? JSON.parse(window.localStorage.getItem('tempCart')) : [];
        let count = -1;

        let found = productArray.some(product => {
            count += 1;
            return product.id === this.productID;
        });

        if (found) {
            productArray[count].quantity += parseInt(document.getElementById("quantitySelectBox").value);
            productArray[count].totalPrice = parseInt(productArray[count].totalPrice) + (parseInt(this.state.productPrice) * parseInt(document.getElementById("quantitySelectBox").value));
        } else {
            productArray.push({
                id: this.productID,
                name: this.state.productName,
                img: this.state.productUrl,
                quantity: parseInt(document.getElementById("quantitySelectBox").value),
                price: parseInt(this.state.productPrice),
                totalPrice: (parseInt(document.getElementById("quantitySelectBox").value) * parseInt(this.state.productPrice))
            });
        }
        window.localStorage.setItem('tempCart', JSON.stringify(productArray));

        alert("Item is added to Cart");

    }

    render() {
        return (

            <div className="wrapper">
                <Container >
                    <div className="row container-fluid">
                        <div className="col-lg-4 col-xs-5 mt-5">
                            <div className="row h-100">
                                <div className="col">
                                    <Product img={this.state.productUrl} />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 col-lg-6 col-xs-5 mt-1">
                            <div className="row h-80">
                                <div class="h-50  col" style={{ "marginBottom": "5px" }}>
                                    <div className="mt-5">
                                        <h1 className="display-4">
                                            {
                                                this.state.productName
                                            }
                                        </h1>
                                        {this.getStockText()}

                                    </div>
                                </div>
                                <div className="w-100 ml-3 container-fluid" >
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                Quantity
                                                <select className="form-control"
                                                    onChange={this.onDropdownSelected}
                                                    id="quantitySelectBox">
                                                    {this.createSelectuantity()}
                                                </select>
                                            </div>

                                            <div className="col-md-4 mt-3 ml-3">
                                                {this.getPurchaseButtons()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="h-50 col mt-4" >
                                    <h4>Product price: &nbsp;$
                                    {this.state.productPrice}
                                    </h4>
                                    <br />
                                    Product description:
                                    <hr />
                                    <p className="h6">
                                        {
                                            this.state.productDescription
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductSpecifics productId={this.props.location.state.query} />
                    <ProductRating parentProps={this.props} productId={this.props.location.state.query} />
                    <ProductReviews productId={this.props.location.state.query} />
                </Container>
                <br />
                <br />
            </div>
        );
    }
}

export default ProductDetails;
