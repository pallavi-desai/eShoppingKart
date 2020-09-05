import React, {Component} from "react";
import '../CSS/Card.css';
import {withRouter} from "react-router-dom";

class Card extends Component {

    addItemsToCart(id, name, image, price) {
        let productArray = window.localStorage.getItem('tempCart') ? JSON.parse(window.localStorage.getItem('tempCart')) : [];

        let count = -1;

        let found = productArray.some(product => {
            count += 1;
            return product.id === id;
        });

        if(found){
            productArray[count].quantity += 1;
            productArray[count].totalPrice = parseInt(productArray[count].totalPrice) + parseInt(price);
        }else{
            productArray.push({
                id: id,
                name: name,
                img: image,
                quantity: 1,
                price: price,
                totalPrice: price
            });
        }
        window.localStorage.setItem('tempCart', JSON.stringify(productArray));

        alert("Item is added to Cart");
    }

    render() {
        return (
            <div className="product">
                <div className="hoverClass"
                     onClick={() => this.props.history.push('/product', {'query': this.props.id})}>
                    <img className="productImage" alt={this.props.name} src={this.props.image}/>
                    <div className="productName">{this.props.name}</div>
                    <div className="price">${this.props.price}</div>
                    <div className="category">{this.props.category}</div>
                </div>
                <button className="addtocart" onClick={() => {
                    this.addItemsToCart(this.props.id, this.props.name, this.props.image, this.props.price)
                }}>
                    Add to Cart
                </button>
            </div>
        );
    }
}

export default withRouter(Card);
